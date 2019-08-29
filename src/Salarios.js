
import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
    export class Salario extends Component {
  
      render() {
          return (
              <div>   
                     
                      <div>  
                    <h1>Salarios cadastrados</h1>  
              <table className="pure-table">
              
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Salario</th>
                    <th>Idade</th>
                  </tr>
                </thead>
                <tbody>
                {
                    this.props.lista.map(function(autor){
                    return (
                      <tr key ={autor.id}>
                        <td>{autor.employee_name}</td>
                        <td>{autor.employee_salary}</td>
                        <td>{autor.employee_age}</td>
                      </tr>
                  );
                })
            }
                </tbody>
              </table> 
              </div>
         
            </div>             
          );
  
  
  
      }
  }

  
export default class SalariosBox extends Component{
  atualizaListagem(novaLista) {
      this.setState({lista2:novaLista});
    }
    constructor() {
      super();
      this.state = {lista2 : []};
      this.atualizaListagem = this.atualizaListagem.bind(this);
   
    }
  
    componentDidMount(){
      $.ajax({
          url:"http://dummy.restapiexample.com/api/v1/employees",
          dataType: 'json',
          success:function(resposta){
            console.log("chegou a resposta");
            
             this.setState({lista2:resposta});
            }.bind(this)
      }
    );
    
    PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
     

      this.setState({lista2:novaLista});

      
      console.log(novaLista);
    }.bind(this));
    }
      
  render() {
      return(
        <div>
     
          <Salario lista={this.state.lista2}/>
        </div>
      );
    }
  }