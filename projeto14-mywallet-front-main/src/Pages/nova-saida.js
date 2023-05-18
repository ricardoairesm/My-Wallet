import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function NovaSaida() {

    const navigate = useNavigate();
    const [info, setInfo] = useContext(Context);
    const [estado, setEstado] = useState("padrao");
    const [infoTransaction, setInfoTransaction] = useState({
        valor: "",
        descricao: ""
    });
    const config = {
        headers: {
            "Authorization": `Bearer ${info.token}`
        }
    };
    function handleTransaction(e) {
        setInfoTransaction({
            ...infoTransaction,
            [e.target.name]: e.target.value,
        })
    }

    const sendInfo = async (e) => {
        e.preventDefault();
        try {
            setEstado("Loading");
            await axios.post('/transactions/saida', infoTransaction, config);
            navigate('/home');
        } catch (error) {
            alert("Confira se os campos foram preenchidos corretamente");
            setEstado("padrao");
        }
    }
    if (estado === "padrao") {
        return (
            <>
                <Corpo>
                    <TopTitle>Nova saída</TopTitle>
                    <form onSubmit={sendInfo}>
                        <InputValor data-test="registry-amount-input" name="valor" onChange={handleTransaction} />
                        <InputDescricao data-test="registry-name-input" name="descricao" onChange={handleTransaction} />
                        <BotaoSalvar data-test="registry-save" type="submit">Salvar saída</BotaoSalvar>
                    </form>
                </Corpo>
            </>
        );
    }
    return (
        <Corpo>
            <TopTitle>Nova saída</TopTitle>
            <form onSubmit={sendInfo}>
                <InputValor disabled={true}/>
                <InputDescricao disabled={true}/>
                <BotaoSalvar type="submit" disabled={true}> <ThreeDots width="50px" color="white" /></BotaoSalvar>
            </form>
        </Corpo>

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

const TopTitle = styled.div`
position:absolute;
top:25px;
left:24px;
display:flex;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 31px;
color: #FFFFFF;
`

const InputValor = styled.input.attrs({
    placeholder: "Valor",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:96px;
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
const InputDescricao = styled.input.attrs({
    placeholder: "Descrição",
})`
    &&& {
            all:unset;
            box-sizing:border-box;
            padding-left:11px;        
            width: 326px;
            height: 58px;
            position:absolute;
            top:167px;
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

const BotaoSalvar = styled.button`
all:unset;
display: flex;
justify-content:center;
align-items:center;
position: absolute;
width: 326px;
height: 46px;
top: 238px;
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
