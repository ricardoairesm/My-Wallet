import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/imagens/MyWallet.png";
import { ThreeDots } from "react-loader-spinner";


export default function Cadastro() {

    const [estado, setEstado] = useState("padrao");
    const [error, setError] = useState(null);
    const [infoCadastro, setInfoCadastro] = useState({
        nome: "",
        email: "",
        senha: "",
        senha_conferir: ""
    });
    const navigate = useNavigate();

    function handleForm(e) {
        setInfoCadastro({
            ...infoCadastro,
            [e.target.name]: e.target.value,
        })
    }

    const sendCadastro = async (e) => {
        e.preventDefault();
        try {
            setEstado("Loading");
            const { senha, senha_conferir } = infoCadastro
            if (senha != senha_conferir) {
                setEstado("padrao");
                return alert("A senhas devem ser iguais!");
            }
            const { data } = await axios.post('/sign-up', infoCadastro);
            navigate('/');
        } catch (error) {
            setError(error.response.data);
            alert("Este email já esta sendo utilizado!");
            setEstado("padrao");
        }
    }



    if (estado === "padrao") {
        return (
            <>
                <Corpo>

                    <Logo>
                        <img src={logo}></img>
                    </Logo>

                    <form onSubmit={sendCadastro}>
                        <InputNome data-test="name" type="text" name="nome" onChange={handleForm} />
                        <InputEmail data-test="email" type="email" name="email" onChange={handleForm} />
                        <InputSenha data-test="password" type="password" name="senha" onChange={handleForm} />
                        <InputConfirmarSenha data-test="conf-password" type="password" name="senha_conferir" onChange={handleForm} />
                        <BotaoCadastrar data-test="sign-up-submit" type="submit">Cadastrar</BotaoCadastrar>
                    </form>
                    <Link to="/">
                        <IrLogin data-test="login-link">Já tem uma conta? Faça login!</IrLogin>
                    </Link>

                </Corpo>
            </>
        )
    }

    return (
        <>
            <Corpo>

                <Logo>
                    <img src={logo}></img>
                </Logo>

                <form id="formCadastro">
                    <InputNome disabled={true} />
                    <InputEmail disabled={true} />
                    <InputSenha disabled={true} />
                    <InputConfirmarSenha disabled={true} type="url" name="image" onChange={handleForm} />
                </form>

                <BotaoCadastrar disabled={true}><ThreeDots width="50px" color="white" /></BotaoCadastrar>

                <Link to="/">
                    <IrLogin>Já tem uma conta? Faça login!</IrLogin>
                </Link>

            </Corpo>
        </>
    )


}


const Corpo = styled.div`
background-color: #8C11BE;
width:375px;
height:667px;
box-sizing:border-box;
position:relative;
justify-content:center;
display:flex;
`
const Logo = styled.div`
position:absolute;
top:95px;
`

const InputNome = styled.input.attrs({
    placeholder: "Nome",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:173px;
            left:25px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;

                color: #000000;
            }
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }      
    }
  `

const InputEmail = styled.input.attrs({
    placeholder: "E-mail",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:244px;
            left:25px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;

                color: #000000;
            }    
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }     
    }
  `



const InputSenha = styled.input.attrs({
    placeholder: "Senha",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top: 315px;
            left:25px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;

                color: #000000;
            } 
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }          
    }
  `



const InputConfirmarSenha = styled.input.attrs({
    placeholder: "Confirme a senha",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:386px;
            left:25px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: black;
            ::placeholder{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;

                color: #000000;
            }   
            :disabled{
                background: #F2F2F2;
                border: 1px solid #D5D5D5;
                border-radius: 5px;
                color: #AFAFAF;
            }      
    }
  `

const BotaoCadastrar = styled.button`
all:unset;
display: flex;
justify-content:center;
align-items:center;
position: absolute;
width: 326px;
height: 46px;
top: 483px;
left:25px;
background: #A328D6;
border-radius: 5px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 23px;

color: #FFFFFF;

`

const IrLogin = styled.div`
all:unset;
   
position: absolute;
width: 227px;
height: 18px;
left: 74px;
top: 535px;

font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;

/* identical to box height */

color: #FFFFFF;


  `