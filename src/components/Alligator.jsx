const Alligator = ({ animate, sadigator, direction = 'right', moveDirection = null }) => {
        // Get movement class based on moveDirection
        const getMovementClass = () => {
                if (!moveDirection) return '';
                
                if (moveDirection === 'left') {
                        return 'alligator-move-left';
                } else if (moveDirection === 'right') {
                        return 'alligator-move-right';
                }
                return '';
        };
        
        const movementClass = getMovementClass();
        
        // Add direction-based flipping when not moving
        const directionClass = !moveDirection && direction === 'left' ? 'scale-x-[-1]' : '';
        
        return (
            <>
                {/* Alligator Container */}
                <div 
                    className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ${movementClass} ${directionClass}`}
                >
                {/* Top Of Alligator */}
                <div className={`${animate ? 'alligator-top-jaw' : ''} z-10`}>
                        {/* Sad Eyebrows */}
                        <div className={`${sadigator ? 'sad-eyebrows' : 'opacity-0'}`}>
                            <div>
                                <div style={{
                                    width: '15px',
                                    height: '4px',
                                    backgroundColor: 'black',
                                    borderRadius: '2px',
                                    rotate: '0deg',
                                    transform: 'translate(10px, 5px)'
                                }}></div>
                                <div style={{
                                    width: '15px',
                                    height: '4px',
                                    backgroundColor: 'black',
                                    borderRadius: '2px',
                                    rotate: '-50deg',
                                    transform: 'translate(-30px, 2px)',
                                    zIndex: '50'
                                }}></div>
                            </div>
                        </div>
                        {/* Eyes */}
                        <div style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                border: '3px solid #22c55e',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingLeft: '2px',
                                margin: '20px 0',
                                position: 'absolute',
                                transform: 'translate(-8px, -2px)',
                                zIndex: '10'
                        }}>
                                <div style={{
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        backgroundColor: 'black'
                                }}></div>
                                {/* Conditional sad eyelid */}
                                {sadigator && (
                                        <div style={{
                                                width: '21px',
                                                height: '11px',
                                                backgroundColor: '#22c55e',
                                                borderRadius: '0 0 21px 21px',
                                                position: 'absolute',
                                                top: '2px',
                                                left: '-5px',
                                                zIndex: '5',
                                                rotate: '110deg'
                                        }}></div>
                                )}
                        </div>
                        <div style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                border: '3px solid #22c55e',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingLeft: '2px',
                                margin: '20px 0',
                                position: 'absolute',
                                transform: 'translate(7px, -17px)'
                        }}>
                                <div style={{
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        backgroundColor: 'black'
                                }}></div>
                                {/* Conditional sad eyelid */}
                                {sadigator && (
                                        <div style={{
                                                width: '21px',
                                                height: '11px',
                                                backgroundColor: '#22c55e',
                                                borderRadius: '0 0 21px 21px',
                                                position: 'absolute',
                                                top: '0px',
                                                left: '-1px',
                                                zIndex: '5',
                                                rotate: '-180deg'
                                        }}></div>
                                )}
                        </div>
                        {/* Nose */}
                        <div>
                                <div style={{
                                        width: '20px',
                                        height: '10px',
                                        backgroundColor: '#22c55e',
                                        borderRadius: '10px 10px 0 0',                                                        borderBottom: 'none',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        paddingBottom: '1px',
                                        position: 'relative',
                                        transform: 'translate(30px, 18px)',
                                        rotate: '-30deg'
                                }}>
                                        <div style={{
                                                width: '6px',
                                                height: '3px',
                                                backgroundColor: 'black',
                                                borderRadius: '3px 3px 0 0'
                                        }}></div>
                                </div>
                        </div>
                        {/* Top Mouth */}
                        <div style={{
                                width: '70px',
                                height: '10px',
                                backgroundColor: '#22c55e',
                                borderRadius: '4px',
                                margin: '5px 0',
                                rotate: '-30deg',
                                transform: 'translate(-5px, 2px)'
                        }}></div>
                        {/* Top Teeth */}
                        <div>
                                <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '2px',
                                        transform: 'translate(-15px, 2px)',
                                        rotate: '150deg'
                                }}>
                                        <div style={{
                                                width: '12px',
                                                height: '6px',
                                                backgroundColor: 'white',
                                                borderRadius: '6px 6px 0 0',
                                                border: '2px solid black',
                                                borderBottom: 'none'
                                        }}></div>
                                        <div style={{
                                                width: '12px',
                                                height: '6px',
                                                backgroundColor: 'white',
                                                borderRadius: '6px 6px 0 0',
                                                border: '2px solid black',
                                                borderBottom: 'none'
                                        }}></div>
                                        <div style={{
                                                width: '12px',
                                                height: '6px',
                                                backgroundColor: 'white',
                                                borderRadius: '6px 6px 0 0',
                                                border: '2px solid black',
                                                borderBottom: 'none'
                                        }}></div>
                                </div>
                        </div>
                </div>
                {/* Bottom Of Alligator */}
                <div className={`${animate ? 'alligator-bottom-jaw' : ''} translate-y-[-12px]`}>
                        {/* Bottom Teeth */}
                        <div>
                                <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '2px',
                                        transform: 'translate(15px, 15px)',
                                        rotate: '20deg'
                                }}>
                                        <div style={{
                                                width: '12px',
                                                height: '6px',
                                                backgroundColor: 'white',
                                                borderRadius: '6px 6px 0 0',
                                                border: '2px solid black',
                                                borderBottom: 'none'
                                        }}></div>
                                        <div style={{
                                                width: '12px',
                                                height: '6px',
                                                backgroundColor: 'white',
                                                borderRadius: '6px 6px 0 0',
                                                border: '2px solid black',
                                                borderBottom: 'none'
                                        }}></div>
                                </div>
                        </div>
                        {/* Bottom Mouth */}
                        <div style={{
                                width: '60px',
                                height: '10px',
                                backgroundColor: '#22c55e',
                                borderRadius: '4px',
                                margin: '6px 0',
                                rotate: '20deg',
                                transform: 'translate(-2px, 9px)'
                        }}></div>
                        </div>
                </div>
        </>
        )
}

export default Alligator;