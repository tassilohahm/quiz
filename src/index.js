import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import questions from './dummyquestions.json' 
import cardBackMusic from './Jeopardy.mp3';

console.log(questions)

// Square component represents a clickable square in the quiz game.
// It displays the value and applies the specified styling (props.dim).
// It triggers the onClick event when clicked.
function Square(props){   
    return (
    <button className="square" onClick={props.onClick} style={props.dim}>
        {props.value}
    </button>
    );
}

// Title component represents the title of a quiz category.
// It displays the value and applies the specified styling (props.dim).
function Title(props){   
    return (
    <button className="title" style={props.dim}>
        {props.value}
    </button>
    );
}

// QuestionBack component represents the back side of a question card.
// It displays the value and applies the specified position styling (props.pos).
// It triggers the onClick event when clicked.
function QuestionBack(props){
    return(
    <button className="questionBack" onClick={props.onClick} style={props.pos}>
        <div className="questContent">
            {props.value}
        </div>
    </button>
    );
}
  

// The Board component represents the game board of the Jeopardy quiz. 
class Board extends React.Component {
    constructor(props){
        super(props);

        // Set the initial state
        this.state={
            content: questions,
            squares: ["200","400","600","800","1000","200","400","600","800","1000","200","400","600","800","1000","200","400","600","800","1000","200","400","600","800","1000","200","400","600","800","1000",],
            titles: questions.categories,
            squaredim: {height: window.innerHeight/6.5, width: window.innerWidth/6.5},
            questpos: {height: "1px" ,width: "1px", zIndex:1, opacity:0},
            currentquest: null,
        };
    }

    // Handles the click event on the question back side
    questionClick(){
        this.setState({questpos: {height: "1px" ,width: "1px", zIndex:1, opacity:0}});
        // stop the music
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }

    // Renders the QuestionBack component
    renderQuestionBack(){
        return (<QuestionBack 
            value={this.state.currentquest} 
            onClick={()=>this.questionClick()} 
            pos={this.state.questpos}/>);
    }

    // Render an individual square
    renderSquare(i) {

        // Determine the category based on the square index
        if(i<=4){
            var cat = this.state.titles[0];
        }
        else if(i<=9){
            var cat = this.state.titles[1];
        }
        else if(i<=14){
            var cat = this.state.titles[2];
        }
        else if(i<=19){
            var cat = this.state.titles[3];
        }
        else if(i<=24){
            var cat = this.state.titles[4];
        }
        else if(i<=29){
            var cat = this.state.titles[5];
        }

        var val=this.state.squares[i];

        // Render the Square component with appropriate props
        return (<Square 
            value={val} 
            onClick={()=>this.handleClick(val, cat, i)} 
            dim={this.state.squaredim}/>);
    }

    // Handles the click event on a square
    handleClick(val, cat, i) {

        // If the square has already been clicked, return
        if(val==null){
            return;
        }

        // Play the music
        this.audioElement.play();

        // Get the current question based on the category and value
        var curquest = questions[cat][val];

        // Update the state to show the question and expand the QuestionBack component
        this.setState(
            {questpos: {height: window.innerHeight*0.935 ,width: window.innerWidth*0.935, zIndex:3, opacity:1, gridArea:"a"}},
        );

        this.setState({currentquest: curquest})

        // Update the squares array to remove the selected question
        const delarr = this.state.squares;
        delarr[i] = null;

        this.setState({squares: delarr})
    }

    

    // Render an individual category title
    renderTitle(i){
        return(<Title
            value={this.state.titles[i]} 
            dim={this.state.squaredim}/>);
    }

    // Render the Board component
    render() {
        return (
        <div className= "field-container">
            <div className="whole-field"> 
                <div className="board-column">
                    {/* Render Title and Squares for column 0 */}
                    {this.renderTitle(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}

                </div>
                {/* Repeat the above pattern for the remaining columns */}
                <div className="board-column">
                    {this.renderTitle(1)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    
                </div>
                <div className="board-column">
                    {this.renderTitle(2)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                </div>
                <div className="board-column">
                    {this.renderTitle(3)}
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                </div>
                <div className="board-column">
                    {this.renderTitle(4)}
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                </div>
                <div className="board-column">
                    {this.renderTitle(5)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                </div>
            </div>
            {/* Render the QuestionBack component */}
            {this.renderQuestionBack()}
            {/* Add the audio element */}
            <audio src={cardBackMusic} ref={audio => (this.audioElement = audio)} />
        </div>
            
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">  
            <div className="game-board">
            <Board />
            </div>
        </div>
        );
    }
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);
