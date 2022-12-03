import { Button, Form, Input} from "antd";
import { useState } from "react";
import './App.css';

function App() {
  
  const negative_to_be = (subject: any) => {
    switch (subject) {
      case 'i':
          return ["was not", "wasn't"]
      case 'you':
          return ["were not", "weren't"]
      case 'he':
        return ["was not", "wasn't"]
      case 'she':
        return ["was not", "wasn't"]
      case 'it':
        return ["was not", "wasn't"]
      case 'they':
        return ["were not", "weren't"]
      default:
        return []
    }
  }

  const [textValidate, setTextValidate] = useState("")

  const reemplace_phrase = (phrase: any, negations: any) => {
    const obtain_phrase = phrase.toLowerCase();
    for(let i in negations){
      if(obtain_phrase.includes(negations[i])){
        const response = obtain_phrase.replace(`${negations[i]}`, `,${negations[i]},`).replace(' ,', ',').replace(', ',',')
        return response.split(',')
      }
    }
    return []
  }

  const onFinish = (values: any) => {
    setTextValidate("")
    const replace_spaces = values.texto.toLowerCase().replace(' ', ',')
    let convert_array  = replace_spaces.split(',')
    const obtain_position_zero = convert_array[0]
    const obtain_negative_to_be = negative_to_be(obtain_position_zero)
    if(obtain_negative_to_be.length === 0){
      setTextValidate("No Es Una Estructura Negativa Valida")
      return
    }

    const search_negative_to_be = reemplace_phrase(values.texto, obtain_negative_to_be)
    if(search_negative_to_be.length == 0){
      setTextValidate(`No se Encontro La Forma Negativa del Sujeto "${obtain_position_zero}"`)
      return
    }

    const validate_to_be_position_one = obtain_negative_to_be.some( data => data === search_negative_to_be[1] ) 
    console.log(search_negative_to_be.length)

    if(search_negative_to_be[0] === obtain_position_zero && validate_to_be_position_one ) {
      setTextValidate("Frase Negativa")
    }else{
      setTextValidate("No Es Una Estructura Negativa Valida")
    }
    
  };

  return (
   
    <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <h1 className="Auth-form-title">II Proyecto Automatas Gramaticales</h1>
            <h3 className="Auth-form-description"> Ingrese Frase En Ingles En Pasado Negativo</h3>
              <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
          >

              <div className="form-group m-t-40">
                  <div className="col-xs-12">
                      <Form.Item
                          name="texto"
                          rules={[{ required: true, message: '¡Ingresa El Texto!' }]}
                      >
                          <Input placeholder="Ingrese Frase En Ingles" />
                      </Form.Item>
                  </div>
              </div>
      
              <div className="form-group text-center m-t-20">
                  <div className="col-xs-12">
                      <Form.Item>
                          <Button
                               type="primary" htmlType="submit" className="login-form-button"
                          >
                              Validar
                          </Button>
                      </Form.Item>
                  </div>
              </div>
          </Form>
          <b className="m-t-40">{textValidate}</b>
          </div>
        </div>
      </div>
  );
}

export default App;
