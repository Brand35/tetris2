import { Component } from "react";
import "./App.css";
import Grid from "./Grid.jsx";
import Tetrominos from "./Tetronimos.jsx";

class App extends Component {



  state = {
    grid: null, // par defaut on dit que c'est null
    gridHeight: 20, //les y represente la hauteur
    gridWidth: 10, //les x represente la largeur
                                                                             // permet de changer dynamiquement la grille
    piece: null
                                                             //null besoin de mettre current piece car il y aura q'une seule piece qui se deplacera
  }

 // j'appel le composant init des qu'il va etre monter avec le componentdimount
 componentDidMount() {
  this.initGame()
}


  initGame = () => {
    this.setState({ grid: this.buildGrid() }, () => {
      this.generatePiece()
                                                                               // console.log("build grid end")
    })                                                                                       // on doit creer le composant qui vient d'etre creer  grid.jsx
  }



  // grid function
  buildGrid = () => {
    let grid = []
    for (let y = 0; y < this.state.gridHeight; y++) {
      let line = []
      for (let x = 0; x < this.state.gridWidth; x++) {
        line.push(0)
      }
      grid.push(line)
    }
                                                                               // pour faire un test je vais modifier la grille apres avoir creer la fonction de deplacement dans la grille 

// grid[0][0]=1
// grid[0][1]=1
// grid[0][2]=1
// grid[0][3]=1 permet d'identifier si la piece peut etre placer

                                                                               // avec ce resultat on devrait avoir un retour false car la valeur est strictement superieur a 1  
    return grid
  }




  // piece function
  generatePiece = () => {
                                                                                  // on va creer plusieur propriete pour donner une position a la piece
    let piece = {}
    piece.posX = 0
    piece.posY = 0
    piece.grid = Tetrominos[0]
                                                                                        // je fais appel a cette methode pour voir si la piece peu bouger en appelant une variable resultat
    let result = this.pieceCanBeMove(piece)
    console.log(result)

                                                                                 // Tetrominos[0]
                                                                                 // ceci est une grille internet a la piece il ne faut pas confondre avec la grille principal GRID
                                                                                            //la fonction recupere la premiere clef
                                                                                                  // console.log(piece)
  if (result ){
    this.setState({piece})
  }                                                                                                
  }
  
//            axe 

  //      [0, 0, 1],
  //      [1, 1, 1],
  //      [0, 0, 0]

  pieceCanBeMove = (piece) => {
                                                                             //on va creer une methode pour voir si il n y a pas de 1 pour que la piece puisse bouger
                                                                          // je recreer une boucle pour initié la position de la piece et voir si elle peut bouger dans ma grille
                                                                   // utilise la methode length pour recupere le nombre d'element dans le tableau
    for (let y = 0; y < piece.grid.length; y++) {
      for (let x = 0; x < piece.grid[0].length; x++) {
                                                                           // on appel la boucle if pour voir si la piece est plus grande que zero
        if (piece.grid[y][x] > 0){
          if (this.state.grid[y + piece.posY][x + piece.posX] > 0) {
                                                                             // je vais aussi devoir detecter la position de la piece
            return false
          }
        }
                                                                          // on devrait donc voir des 1 dans notre tableau
                                                                         // si je ne retourne rien ma grille devrai afficher un undefined
      }
    }
    return true
  }





  render() {
    return (
      <div id="wrapper_tetris">
        <h1>TETRIS</h1>
        {
                                                                                       // ici on conditionne l'affichage
          this.state.grid !== null && <Grid 
          grid={this.state.grid} 
          piece={this.state.piece }/>
          // on generer la piece a ce niveau pour la recupere en parametre de notre grid (props)
        }
      </div>
    )
  }
}




export default App;
