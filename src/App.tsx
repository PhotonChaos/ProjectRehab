import {useEffect, useRef, useState} from 'react'
import rehabLogo from '/project_rehab.svg'
import './App.css'
import ConsoleType from "./components/ConsoleType.tsx";
import {flushSync} from "react-dom";

const prisoner_id = Math.floor(Math.random() * 1000000) + 1

function App() {
    const [yn_disable, set_yn_disable] = useState(false)
    const [yn_finish, set_yn_finish] = useState(false)
    const [elig_disable, set_elig_disable]  = useState(false)
    const [elig_finish, set_elig_finish]  = useState(false)
    const [submit_finish, set_submit_finish]  = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const secondParagraph = <ConsoleType text={[
        "It doesn't matter what you believe. What matters is our lack of data.",
        "We can't say for certain if a prison cell is less effective than a stable job.",
        "But that can be changed.",
        "PROJECT: REHAB is an experimental program to gather data on this very subject.",
        "Participants will be assigned a handler, and will carry out missions for the betterment of society.",
        "Successful completion of the program will replace the remainder of their sentence if applicable, and will void all fines against the subject. They will also receive income which may be spent on personal use (Debt elimination recommended).",
        "Exceptional performance may result in some or all of the participants criminal record receiving classified status."
    ]} charDelay={25} onFinish={()=>{set_elig_finish(true);}}/>

    const thirdParagraph = <ConsoleType text={[
        "Due to your LANCER piloting experience, you are eligible to participate in the experiment PROJECT: REHAB."
    ]} charDelay={25} onFinish={()=>{set_submit_finish(true);}}/>

    useEffect(() => {
        setTimeout(()=>{
            flushSync(() => {
                if(ref.current !== null) {
                    ref.current.scrollIntoView();
                }
            })
        }, 1);
    }, [yn_disable, yn_finish, elig_disable, elig_finish, submit_finish]);

    return (
        <>
            <div className="head-section">
                <img src={rehabLogo} className="logo" alt="Project rehab logo"/>
                <h1>PROJECT: REHAB</h1>
            </div>
            <br/>
            <ConsoleType text={[
                `Welcome, prisoner #${prisoner_id}.`,
                "Do you believe in restorative justice?",
                "That it is more valuable to rehabilitate a criminal than to punish one?"
            ]} charDelay={25} onFinish={()=>{set_yn_finish(true);}}/>
            {yn_finish ? <div className="card">
                <button disabled={yn_disable} onClick={() => {set_yn_disable(true);}}>
                    YES
                </button>
                <button disabled={yn_disable} onClick={() => {set_yn_disable(true);}}>
                    NO
                </button>
            </div> : <div></div>}
            {yn_disable ? secondParagraph : <div></div>}
            {elig_finish ? <div className="card">
                <button disabled={elig_disable} onClick={() => {
                    set_elig_disable(true);
                }}>Check Program Eligibility
                </button>
            </div> : <div></div>}
            {elig_disable ? thirdParagraph : <div></div>}
            {submit_finish ? <div className="card">
                <button>
                    <a href="https://forms.gle/v38eSFoLhv6be9mu7">SUBMIT APPLICATION</a>
                </button>
            </div> : <div></div>}
            <div className="scroll-footer" ref={ref}></div>
        </>
    )
}

export default App
