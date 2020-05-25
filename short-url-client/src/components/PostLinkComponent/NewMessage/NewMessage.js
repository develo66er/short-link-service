import React from 'react';
import styles from './NewMessage.module.css';

function Output(props){
   
    if(props.link){
        return  <div>
            <input type="hidden" name="uid" value={props.uid}/>
            <input type="hidden" name="link" value={props.link}/>
            <a href="#" onClick={props.dataRedirected}>{props.link}</a>
        </div>;
    }
    else if(props.errMsg){
        return  <div>{props.errMsg}</div>;
    }
    return '';
}
const NewMessage =(props)=> (
            <div className={styles.NewMessage}>
                <h1>Добавьте ссылку: </h1>
                <input type="text" value={props.text} onChange={props.textChanged} required/>
                <button onClick={props.dataPosted}>получить ссылку</button>
                <Output 
                link = {props.link}
                uid = {props.uid}
                errMsg = {props.errMsg}
                dataRedirected ={props.dataRedirected} />
            </div>
        );
  

export default NewMessage;