import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Hover detection system
function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  let lastTouchTime = 0

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover() {
    document.body.classList.remove('hasHover')
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date()
  }

  document.addEventListener('touchstart', updateLastTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)

  enableHover()
}

// Initialize hover detection
watchForHover()

// UI Components Imports
import { Container } from './ui/reused-ui/Container.jsx'
import Alligator from './Alligator.jsx';

// UI Animation Imports
import './ui/reused-animations/fade.css';
import './ui/reused-animations/scale.css';
import './ui/reused-animations/glow.css';
import './Alligator.css';

const ComparingNumbers = () => {
        const [animate, setAnimate] = useState(false);
        const [sadigator, setSadigator] = useState(false);
        const [alligatorDirection, setAlligatorDirection] = useState('right'); // 'left' or 'right'
        const [leftNumber, setLeftNumber] = useState(5);
        const [rightNumber, setRightNumber] = useState(9);
        const [isAnimating, setIsAnimating] = useState(false);
        const [showTryAgain, setShowTryAgain] = useState(false);
        const [showGreatJob, setShowGreatJob] = useState(false);
        const [wasCorrectAnswer, setWasCorrectAnswer] = useState(false);
        const [alligatorMoveDirection, setAlligatorMoveDirection] = useState(null); // 'left', 'right', or null
        const [currentSuccessMessage, setCurrentSuccessMessage] = useState(''); // Store the current success message
        const [selectedSide, setSelectedSide] = useState(null); // Track which side was selected ('left', 'right', or null)
        const [fadeOutButton, setFadeOutButton] = useState(null); // Track which button should fade out ('left', 'right', or null)
        
        // Set of good response messages
        const successMessages = [
                "Great Job! You're a number comparing master!",
                "Excellent! You know your number places!",
                "Fantastic! You're getting really good at this!",
                "Amazing! You chose the bigger number!",
                "Outstanding! You made the alligator very happy!",
                "Brilliant! You're mastering number places!",
                "Super! You chose the correct side!",
                "Wonderful! You're learning so well!",
                "Terrific! You're becoming a number comparing expert!"
        ];
        
        // Function to get a random success message
        const getRandomSuccessMessage = () => {
                const randomIndex = Math.floor(Math.random() * successMessages.length);
                return successMessages[randomIndex];
        };
        
        // Function to trigger confetti animation
        const triggerConfetti = () => {
                confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                });
        };
                
        // Generate random numbers on component mount
        useEffect(() => {
                generateRandomCounts();
        }, []);
        
        // Returns a random number in either two- or three-digit range depending on flag
        const generateTwoOrThreeDigitNumber = (isThreeDigits) => {
                const min = isThreeDigits ? 100 : 10;
                const max = isThreeDigits ? 999 : 99;
                return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const generateRandomCounts = () => {
                const isThreeDigits = Math.random() < 0.5;
                const shouldHaveSameLeftmostDigit = Math.random() < 0.6; 
                let left, right;
                
                if (shouldHaveSameLeftmostDigit) {
                        // Generate numbers with the same leftmost digit
                        do {
                                left = generateTwoOrThreeDigitNumber(isThreeDigits);
                                const leftmostDigit = Math.floor(left / Math.pow(10, isThreeDigits ? 2 : 1));
                                
                                // Generate right number with same leftmost digit
                                const min = isThreeDigits ? leftmostDigit * 100 : leftmostDigit * 10;
                                const max = isThreeDigits ? (leftmostDigit + 1) * 100 - 1 : (leftmostDigit + 1) * 10 - 1;
                                right = Math.floor(Math.random() * (max - min + 1)) + min;
                        } while (left === right); // Ensure numbers are never equal
                } else {
                        // Use existing logic for different leftmost digits
                        do {
                                left = generateTwoOrThreeDigitNumber(isThreeDigits);
                                right = generateTwoOrThreeDigitNumber(isThreeDigits);
                        } while (left === right); // Ensure numbers are never equal
                }
                
                setLeftNumber(left);
                setRightNumber(right);
        };
        
        const handleNumberHover = (side) => {
                // Only change direction on hover if not animating and no movement is happening
                if (!isAnimating && !alligatorMoveDirection) {
                        setAlligatorDirection(side);
                }
        };
        
        const handleLeftClick = () => {
                if (isAnimating) return; // Prevent clicks during animation
                
                setIsAnimating(true);
                setSelectedSide('left'); // Mark left side as selected
                const isCorrectAnswer = leftNumber > rightNumber;
                
                if (isCorrectAnswer) {
                        setAnimate(true);
                        setSadigator(false);
                        setShowTryAgain(false); // Correct answer
                        setShowGreatJob(true);
                        setWasCorrectAnswer(true);
                        setAlligatorDirection('left'); // Face left when moving left - set this first
                        setAlligatorMoveDirection('left'); // Move towards left number
                        setCurrentSuccessMessage(getRandomSuccessMessage()); // Set random success message
                        
                        // Trigger confetti animation
                        triggerConfetti();
                        
                        // Fade out the button after alligator reaches it
                        setTimeout(() => {
                                setFadeOutButton('left');
                        }, 1500); // 1.5 seconds after alligator starts moving
                        
                } else {
                        setSadigator(true);
                        setAnimate(false);
                        setShowTryAgain(true); // Incorrect answer
                        setShowGreatJob(false);
                        setWasCorrectAnswer(false);
                }
                
                // Reset animation state after animation completes
                setTimeout(() => {
                        setIsAnimating(false);
                        setAnimate(false);
                        setSadigator(false);
                        setShowTryAgain(false);
                        setShowGreatJob(false);
                        setAlligatorMoveDirection(null);
                        setSelectedSide(null); // Deselect after animation ends
                        setFadeOutButton(null); // Reset fade out state
                        
                        // Regenerate random counts if the correct answer was clicked
                        if (isCorrectAnswer) {
                                generateRandomCounts();
                        }
                        setWasCorrectAnswer(false);
                }, 3000); // 3 seconds for animation
        };
        
        const handleRightClick = () => {
                if (isAnimating) return; // Prevent clicks during animation
                
                setIsAnimating(true);
                setSelectedSide('right'); // Mark right side as selected
                const isCorrectAnswer = rightNumber > leftNumber;
                
                if (isCorrectAnswer) {
                        setAnimate(true);
                        setSadigator(false);
                        setShowTryAgain(false); // Correct answer
                        setShowGreatJob(true);
                        setWasCorrectAnswer(true);
                        setAlligatorDirection('right'); // Face right when moving right - set this first
                        setAlligatorMoveDirection('right'); // Move towards right number
                        setCurrentSuccessMessage(getRandomSuccessMessage()); // Set random success message
                        
                        // Trigger confetti animation
                        triggerConfetti();
                        
                        // Fade out the button after alligator reaches it
                        setTimeout(() => {
                                setFadeOutButton('right');
                        }, 1500); // 1.5 seconds after alligator starts moving
                        
                } else {
                        setSadigator(true);
                        setAnimate(false);
                        setShowTryAgain(true); // Incorrect answer
                        setShowGreatJob(false);
                        setWasCorrectAnswer(false);
                }
                
                // Reset animation state after animation completes
                setTimeout(() => {
                        setIsAnimating(false);
                        setAnimate(false);
                        setSadigator(false);
                        setShowTryAgain(false);
                        setShowGreatJob(false);
                        setAlligatorMoveDirection(null);
                        setSelectedSide(null); // Deselect after animation ends
                        setFadeOutButton(null); // Reset fade out state
                        
                        // Regenerate random counts if the correct answer was clicked
                        if (isCorrectAnswer) {
                                generateRandomCounts();
                        }
                        setWasCorrectAnswer(false);
                }, 3000); // 3 seconds for animation
        };
        
        // Function to handle sound button click
        const handleSoundClick = () => {
                
        };
        
        return (
                <Container 
                        text="Comparison Symbol Practice" 
                        showResetButton={false}
                        borderColor="#FF7B00"
                        showSoundButton={true}
                        onSound={handleSoundClick}
                >
                        <div className='text-center text-sm text-gray-500 p-5'>
                                Comparison Alligator is hungry! Click the side with the bigger number to feed him. If you click the side with the smaller number, he will be sad.
                        </div>

                        {/* Alligator */}
                        <Alligator 
                                animate={animate} 
                                sadigator={sadigator} 
                                direction={alligatorDirection}
                                moveDirection={alligatorMoveDirection}
                        />
                        
                        {/* Number cards */}
                        <div className='absolute top-[50%] translate-y-[-50%] flex justify-between items-center w-[100%] h-[51%]'>
                                <button
                                        type="button"
                                        onClick={handleLeftClick}
                                        onMouseEnter={() => handleNumberHover('left')}
                                        disabled={isAnimating}
                                        className={`w-28 h-24 md:w-28 md:h-28 max-[410px]:w-24 max-[410px]:h-20 max-[356px]:w-16 mx-2 rounded-2xl border-2 border-amber-400 bg-white/70 backdrop-blur-sm shadow-lg p-4 max-[410px]:p-3 flex items-center justify-center transition-transform duration-200 ${selectedSide === 'left' ? 'ring-4 ring-amber-300' : ''} ${isAnimating ? 'opacity-60' : 'hover:scale-[1.02]'} ${fadeOutButton === 'left' ? 'fade-out-in-place-animation' : ''}`}
                                >
                                        <span className='text-4xl md:text-5xl max-[410px]:text-3xl font-extrabold text-amber-700 select-none'>
                                                {leftNumber}
                                        </span>
                                </button>
                                <button
                                        type="button"
                                        onClick={handleRightClick}
                                        onMouseEnter={() => handleNumberHover('right')}
                                        disabled={isAnimating}
                                        className={`w-28 h-24 md:w-28 md:h-28 max-[410px]:w-24 max-[410px]:h-20 max-[356px]:w-16 mx-2 rounded-2xl border-2 border-amber-400 bg-white/70 backdrop-blur-sm shadow-lg p-4 max-[410px]:p-3 flex items-center justify-center transition-transform duration-200 ${selectedSide === 'right' ? 'ring-4 ring-amber-300' : ''} ${isAnimating ? 'opacity-60' : 'hover:scale-[1.02]'} ${fadeOutButton === 'right' ? 'fade-out-in-place-animation' : ''}`}
                                >
                                        <span className='text-4xl md:text-5xl max-[410px]:text-3xl font-extrabold text-amber-700 select-none'>
                                                {rightNumber}
                                        </span>
                                </button>
                        </div>

                        <div className={`absolute bottom-0 ${showTryAgain || showGreatJob ? 'fade-in-up-animation' : 'fade-out-down-animation'} transition-opacity duration-200 w-full flex justify-center`}>
                                <div className='w-[75%] text-center text-sm p-5'>
                                        {showTryAgain && (
                                                <div className='bg-yellow-100 text-yellow-800 border-2 border-yellow-400 rounded-lg font-bold p-2 m-30'>
                                                        Try Again! Are you sure that side has the bigger number?
                                                </div>
                                        )}
                                        {showGreatJob && (
                                                <div className='bg-green-100 text-green-800 border-2 border-green-400 rounded-lg font-bold p-2 m-30'>
                                                        {currentSuccessMessage}
                                                </div>
                                        )}
                                </div>
                        </div>
                </Container>
        )
};

// Export the ComparingNumbers component
export default ComparingNumbers;