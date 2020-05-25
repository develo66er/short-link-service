import React, {Component} from 'react'
import NewMessage  from './NewMessage/NewMessage'
import axios from 'axios';
import { ConsoleWriter } from 'istanbul-lib-report';

class PostLinkComponent extends Component{

    state = {
        text: '',
        messages:[],
        uid:'',
        link:'',
        error:''
    }
    newMessageTextChangedHandler = (event)=>{
        this.setState({text: event.target.value});
    }

    postDataHandler = () => {

        const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

        if(!this.state.text.match(regexp)){
            this.setState({error:'некорректная ссылка'});
        }
        else{
            this.setState({error:''});
            const data = {
                text: this.state.text,
                uid:this.state.uid
            };
            console.log(JSON.stringify(data));
            this.setState({text: ''});
            axios.post('http://www.localhost:3030/', data)
                .then(response => {
                  
                        this.setState({uid: response.data.uid,link:response.data.link});
                   
                }).catch((err)=>console.log(err));
        }
        
    }
    postRedirectHandler = () => {
        console.log('redirect');
        const data = {
            link: this.state.link,
            uid:this.state.uid
        };
        this.setState({text: '',link:''});
        axios.post('http://www.localhost:3030/link-redirect', data)
            .then(r => {
                console.log(r.data);
                this.setState({uid: r.data.uid});

                let a= document.createElement('a');
                a.target= '_blank';
                a.href= r.data.original_url;
                a.value = r.data.original_url;
                a.click();

            }).catch((err)=>console.log(err));
    }
    render () {
       
        return (
            
            <NewMessage 
            uid = {this.state.uid}
            text={this.state.text}
            textChanged={this.newMessageTextChangedHandler}
            dataPosted={this.postDataHandler}
            dataRedirected={this.postRedirectHandler}
            link={this.state.link}
            errMsg={this.state.error}/>
        );
    }
}
export default PostLinkComponent;