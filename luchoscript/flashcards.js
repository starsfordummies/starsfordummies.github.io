// Starter code

'use strict';

const rce = React.createElement;


// I build cards as global, if I do it inside the flashcardBox 
// JS complains not sure why ?

const cards = [];

for(let i = 0 ; i < 10 ; i++) {
    cards.push({p: "pregunta " + i , r: "respuesta " + i })
} 

class flashcardBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = { show: false, numCard: 0};  // false shows question, true shows answer
    }
    

    // Returns random int between min and max (excluded)
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max)-1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



     flashQuestion(numCard) { 
        return rce(
        'div',
        // {onClick: () => this.state.show = 1},  // doesn't work - must use setState
        {
            key: 'que1',
            className: 'question_card',
            style: {color: "red", backgroundColor: "blue", fontSize: "30px", 
                width: "140px", height: "200px", border:"5px solid",
                textAlign: "center", paddingTop: "40px"},
            onClick: () => this.setState({show: !this.state.show})

        }, 
        'Question ' + numCard
    );
     }



    flashAnswer(numCard) {
        return rce(
        'div',
        {
            key: 'ans1',
            className: 'answer_card',
            style: {color: "red", backgroundColor: "blue", fontSize: "30px", 
                width: "140px", height: "200px", border:"5px solid",
                textAlign: "center", paddingTop: "40px"},
            onClick: () => this.setState({show: !this.state.show})
        },
        'Answer '+ numCard,
        cards[numCard].r
    );
    }



    nextButton() { 
        return rce(
            'button',
            //{style: {color: "red", backgroundColor: "blue"}},
            {
                key: 'bnext',
                className: 'next_button',
                onClick: () => this.setState({numCard: this.getRandomInt(0,cards.length), show: false})
            },
            // 'div'  // if I set this as div, then nothing works !? 
            'Next card'
        );
    }
  
    render() {

        console.log("show = " + this.state.show)

        //const ("p", {style: {color: "red", backgroundColor: "blue"}}, 'this.props.paragraph')


        if (this.state.show) {
            return [ this.flashAnswer(this.state.numCard), this.nextButton()]
        }
        return this.flashQuestion(this.state.numCard)
     
    }

  }
  

//  class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this. ';
//     //     return e(
//     //     'button',
//     //     { onClick: () => this.setState({ liked: false }) },
//     //     'unlike this shit'
//     //   );
//     }

//     const butt_on = rce(
//         'button',
//         { onClick: () => this.setState({ liked: true }) },
//         'Like'
//       );

//     return butt_on 

//     // return e(
//     //   'button',
//     //   { onClick: () => this.setState({ liked: true }) },
//     //   'Like'
//     // );
//   }
//  }



class helloName extends React.Component {
    constructor(props) {
      super(props);
      this.state = { something: false, nClicked: 0 };
    }

    // This doesnt' work ?!
    clickPlusOne() {
        console.log('clickplusone')
        let nc = this.state.nClicked
        console.log('clickplusone: from ' + nc)
        nc = nc+1
        this.setState({nClicked: nc})
        console.log(' to ' + this.state.nClicked)
    }

    Greeting() {

        return rce(
          'h1',
          { 
            key: 'hola',
            className: 'greeting', 
            style: {color: "red", backgroundColor: "blue"},
            // If I do it like this, do I destroy the nClicked property?
            //onClick: () => this.setState({ something: !something }),
            onClick: () => this.setState({nClicked: this.state.nClicked+1}),
            onClick: () => this.clickPlusOne(),
            //onClick: () => console.log("clicked " + this.state.nClicked + "times"),
          },
          'You clicked ',
          rce('i', null, this.state.nClicked),
          ' times'
        );
    }
 
  
    render() {
        console.log("calling greeting")
        return this.Greeting()
    }
}
  

const domContainer = document.querySelector('#flashcard_container');
const root = ReactDOM.createRoot(domContainer);

//root.render(e(LikeButton));
root.render(rce(helloName));


const domContainer2 = document.querySelector('#next_button_container');
const root2 = ReactDOM.createRoot(domContainer2);

root2.render(rce(flashcardBox));

//root2.render(rce(LikeButton));


