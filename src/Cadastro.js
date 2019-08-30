import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
export class FormularioCadastro extends Component{
  
    constructor() {
        super();
        this.state = {lista : [],name:'',salary:'', age:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setSalary = this.setSalary.bind(this);
        this.setAge = this.setAge.bind(this);
      }

      enviaForm(evento){
     
        evento.preventDefault();
        $.ajax({
          url:"http://dummy.restapiexample.com/api/v1/create",
          contentType: 'application/json',
          dataType:'json',
          type:'post',
          data: JSON.stringify({name:this.state.name,salary:this.state.salary,age:this.state.age,id :'719'}),
          success: function(resposta){
            PubSub.publish('atualiza-lista-autores',resposta); 
            
          }.bind(this),
          error: function(resposta){
              console.log(resposta);
          }
    
        });

         
      }
      setName(evento){
        this.setState({name:evento.target.value});
      }
      
      setSalary(evento){
        this.setState({salary:evento.target.value});
      }
      
      setAge(evento){
        this.setState({age:evento.target.value});
      }
        render() {          

          return (
            <div className="pure-form pure-form-aligner">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setName} label="Nome"/>                                              
                <InputCustomizado id="salario" type="text" name="Salario" value={this.state.salary} onChange={this.setSalary} label="Salario"/>                                              
                <InputCustomizado id="idade" type="text" name="Idade" value={this.state.age} onChange={this.setAge} label="Idade"/>                                                   
            <div className="pure-control-group">                                  
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                
                </div>
              </form>
              </div>
                 );
          }

}
export class TabelaCadastro extends Component {
  
    render() {
        return (
            <div>   
                    {
                  this.props.lista.map(function(pessoa){
                  return (
                    <div>  
                        <h1>Novo Salário  cadastrado! </h1>  
            <table className="pure-table">
            
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Salario</th>
                  <th>Idade</th>
                </tr>
              </thead>
              <tbody>
          
                    <tr key ={pessoa.id}>
                      <td>{pessoa.employee_name}</td>
                      <td>{pessoa.employee_salary}</td>
                      <td>{pessoa.age}</td>
                    </tr>
           
              </tbody>
            </table> 
            </div>
            );
          })
      }
          </div>             
        );

    }
}


export default class CadastroBox extends Component{
    atualizaListagem(novaLista) {
        this.setState({lista:novaLista});
      }
      constructor() {
        super();
        this.state = {lista : []};
        this.atualizaListagem = this.atualizaListagem.bind(this);
     
      }
    
    componentDidMount(){
        $.ajax({
            url:"http://dummy.restapiexample.com/api/v1/employees",
            dataType: 'json',
            success:function(resposta){
            
              }.bind(this)
        }
      );
      
    PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
      novaLista = [{id:novaLista.id,employee_name: novaLista.name,employee_salary:novaLista.salary,age:novaLista.age}];

      this.setState({lista:novaLista});

    
       }.bind(this));
      }
        
    render() {
        return(
          <div>
            <FormularioCadastro  />
            <TabelaCadastro lista={this.state.lista}/>
          </div>
        );
      }
    }


