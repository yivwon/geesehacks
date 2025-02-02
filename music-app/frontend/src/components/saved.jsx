import { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue, remove } from 'firebase/database';
import ABCJS from 'abcjs';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Saved = () => {
    const [savedPieces, setSavedPieces] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        // Update reference to user-specific path
        const musicRef = ref(database, `users/${user.uid}/sheetMusic`);
        
        const unsubscribe = onValue(musicRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const piecesArray = Object.entries(data).map(([id, piece]) => ({
                    id,
                    ...piece
                }));
                setSavedPieces(piecesArray);
            } else {
                setSavedPieces([]);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Render sheet music for each piece
    useEffect(() => {
        savedPieces.forEach(piece => {
            const abcString = `X:1\nM:4/4\nL:1/4\nK:C\n${piece.notation}`;
            ABCJS.renderAbc(`sheet-music-${piece.id}`, abcString, {
                responsive: 'resize',
                staffwidth: 300, // Smaller width for preview
                wrap: {
                    preferredMeasuresPerLine: 2, // Show only first 2 measures
                    minSpacing: 2.7,
                    maxSpacing: 3.0
                },
                format: {
                    gchordfont: "italic 12px Arial",
                    measurebox: true,
                }
            });
        });
    }, [savedPieces]);

    const handleDelete = async (id) => {
        try {
            // Update reference to include user ID
            const musicRef = ref(database, `users/${user.uid}/sheetMusic/${id}`);
            await remove(musicRef);
            toast.success('Sheet music deleted successfully!');
        } catch (error) {
            console.error('Error deleting sheet music:', error);
            toast.error('Failed to delete sheet music');
        }
    };

    return (
        <div className="saved-music">
            <h1>Saved Music</h1>
            {savedPieces.length === 0 ? (
                <p>No saved music pieces yet. Create something on the keyboard!</p>
            ) : (
                <div className="music-list">
                    {savedPieces.map(piece => (
                        <div key={piece.id} className="music-item">
                            <div className="music-item-header">
                                <h3>{piece.title}</h3>
                                <button 
                                    onClick={() => handleDelete(piece.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="timestamp">Created: {new Date(piece.timestamp).toLocaleString()}</p>
                            {piece.description && (
                                <p className="description">{piece.description}</p>
                            )}
                            <div id={`sheet-music-${piece.id}`}></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Saved; 