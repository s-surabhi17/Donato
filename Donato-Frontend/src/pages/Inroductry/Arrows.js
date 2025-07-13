// function Arrows({prevSlide, nextSlide}){
//     return ( <div className ="arrows">
//                 {/* <button className = "prev" onClick ={prevSlide}>
                    
//                   </button> */}
//                     <button className = "next" onClick ={nextSlide}>
//                     Next
//                     </button>
//                     <div className="slide-last">
//         <h4>Already a member? SignIn</h4>
//         </div>
//             </div>
//     );
// }
// export default Arrows;

//new

import { useHistory } from 'react-router-dom';

function Arrows({prevSlide, nextSlide}){
    const history = useHistory();
    
    return ( 
        <div className="arrows">                 
            <button className="next" onClick={nextSlide}>Next</button>                     
            <div className="slide-last">         
                <h4>Already a member? 
                    <span 
                        onClick={() => history.push('/login')}
                        style={{ 
                            color: '#ff6b35', 
                            cursor: 'pointer', 
                            textDecoration: 'underline',
                            marginLeft: '5px'
                        }}
                    >
                        SignIn
                    </span>
                </h4>         
            </div>             
        </div>     
    ); 
}