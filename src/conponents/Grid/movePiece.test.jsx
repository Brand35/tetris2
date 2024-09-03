import { movePiece } from './Grid';


test('moves piece to the right without collision', () => {
    const initialPiece = { shape: [[1]], x: 0, y: 0 };
    const grid = Array.from({ length: 20 }, () => Array(10).fill(0));
  
    const movedPiece = movePiece(initialPiece, grid, 1);
    
    // Vérifiez que la pièce a été déplacée
    expect(movedPiece.x).toBe(1);
  });