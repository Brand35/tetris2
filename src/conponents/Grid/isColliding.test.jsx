
import { isColliding } from './Grid';

test('detects collision when piece hits another piece', () => {
    const piece = { shape: [[1]], x: 0, y: 0 };
    const grid = Array.from({ length: 20 }, () => Array(10).fill(0));
    grid[0][1] = 1; // Simule une pièce existante sur la grille
  
    const result = isColliding(piece, grid, 1, 0);
    
    // Vérifiez que la collision est détectée
    expect(result).toBe(true);
  });