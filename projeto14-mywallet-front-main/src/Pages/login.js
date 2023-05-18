import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/imagens/MyWallet.png";
import { ThreeDots } from "react-loader-spinner";
import Context from "./Context";



export default function Login() {
    const [error, setError] = useState(null);
    const [estado, setEstado] = useState("padrao");
    const navigate = useNavigate();
    const [info, setInfo] = useContext(Context);
    const [infoLogin, setInfoLogin] = useState({
        email: "",
        senha: ""
    });


    const sendInfo = async (e) => {
        e.preventDefault();
        try {
            setEstado("Loading");
            const { data } = await axios.post('/sign-in', infoLogin);
            const newInfo = {
                ...info,
                user: data.user,
                token: data.token
            }
            setInfo(newInfo);
            navigate('/home');
        } catch (error) {
            alert("Email ou senha incorretos");
            setEstado("padrao");
            setError(error.response.data);
        }
    }

    function handleLogin(e) {
        setInfoLogin({
            ...infoLogin,
            [e.target.name]: e.target.value,
        })
    }

    if (estado === "padrao") {
        return (
            <>
                <Corpo>

                    <Logo>
                        <img src={logo}></img>
                    </Logo>
                    <form onSubmit={sendInfo}>
                        <InputEmail data-test="email" name="email" onChange={handleLogin} />
                        <InputSenha data-test="password" type="password" name="senha" onChange={handleLogin} />
                        <BotaoEntrar data-test="sign-in-submit" type="submit">Entrar</BotaoEntrar>
                        <Link to="/cadastro">
                            <IrCadastro data-test="signup-link">Primeira vez? Cadastre-se!</IrCadastro>
                        </Link>
                    </form>
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
                <form onSubmit={sendInfo}>
                    <InputEmail disabled={true} name="email" onChange={handleLogin} />
                    <InputSenha disabled={true} type="password" name="password" onChange={handleLogin} />
                    <BotaoEntrarLoading disabled={true}><ThreeDots width="50px" color="white" /></BotaoEntrarLoading>
                    <Link to="/cadastro">
                        <IrCadastro>Primeira vez? Cadastre-se!</IrCadastro>
                    </Link>
                </form>

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
top:159px;
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
            top:233px;
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
    &&&{
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:304px;
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

const BotaoEntrar = styled.button`
    all:unset;
    display: flex;
    justify-content:center;
    align-items:center;
    position: absolute;
    width: 326px;
    height: 46px;
    top: 375px;
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

const BotaoEntrarLoading = styled.button`
all:unset;
display: flex;
justify-content:center;
align-items:center;
position: absolute;
width: 326px;
height: 46px;
top: 375px;
left:25px;
background: #A328D6;
border-radius: 5px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;    
line-height: 23px;
color:#FFFFFF;
`

const IrCadastro = styled.button`
all:unset;
   
position: absolute;
width: 200px;
height: 18px;
left: 92px;
top: 457px;

font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;

/* identical to box height */

color: #FFFFFF;


  `