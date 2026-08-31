import GraduandHat from "../src/assets/capicon.svg"
import { Link } from "react-router-dom"
import "../stylesheets/welcome.css"
import '@fontsource/cal-sans'
import '@fontsource/dm-sans'
import '@fontsource/nunito-sans'
import '@fontsource/roboto'
import '@fontsource/inter'
import '@fontsource/poppins'


function WelcomePage() {
    return (
        <>
            <div className="wrapper">
                <span className="headerTexts">
                    <h3>Welcome To</h3> <p>OUR SCHOOL APP</p>
                </span>
                <svg fill="#8B63BF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="800px" height="800px" viewBox="0 0 484.006 484.006"
                    xmlSpace="preserve" className="welcome-hat">
                    <g>
                        <g>
                            <polygon points="484.006,189.845 484.006,179.186 241.897,62.561 0,179.083 0,189.946 241.897,306.471 		" />
                            <path d="M83.808,251.571v69.7l145.836,70.25h24.506l145.435-70.057c0.14-0.307,0.271-0.613,0.402-0.922V251.57l-158.09,76.152
			L83.808,251.571z"/>
                            <polygon points="458.506,358.195 458.506,222.599 439.359,232.255 439.359,358.195 426.883,396.203 445.742,421.445 
			452.123,421.445 470.981,396.203 		"/>
                        </g>
                    </g>
                </svg>
                <span className="intro-text">This is OTS ICT CENTRE's student tracker. Check students attendance progress and see learning progress</span>
                <Link to='/home'><button className="start-btn">GET STARTED</button></Link>
            </div>
        </>
    )
}


export default WelcomePage