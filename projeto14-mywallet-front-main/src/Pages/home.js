import styled from "styled-components";
import { AiOutlineExport } from "react-icons/ai"
import { AiOutlineMinusCircle } from "react-icons/ai"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context";
import axios from "axios";

export default function Home() {

    const navigate = useNavigate();
    const [info, setInfo] = useContext(Context);
    const [transactions, setTransactions] = useState([]);
    const nomeUsuario = "" + info.user.nome;
    const teste = [];
    const config = {
        headers: {
            "Authorization": `Bearer ${info.token}`
        }
    };
    let total = 0;

    useEffect(() => {
        axios.get('/transactions', config).then(({ data }) => {
            const newTransaction = data;
            console.log(newTransaction);
            setTransactions(newTransaction);
        });
    }, []);

    total = transactions.reduce((accumulator, transaction) => {
        return transaction.type === "entrada" ?
            accumulator + Number(transaction.valor) :
            accumulator - Number(transaction.valor)
    }, 0);

    return (
        <>
            <Corpo>
                <TopTitle>
                    <h1 data-test="user-name">'Olá, {nomeUsuario}'</h1>
                    <AiOutlineExport></AiOutlineExport>
                </TopTitle>
                {transactions.length > 0 ? (
                    <WhiteBoard2>
                        {transactions.map((movimentacao, i) => {
                            return (
                                
                                    <Movimentacao key={i}>
                                        <Date>{movimentacao.dia}</Date>
                                        <Descricao data-test="registry-name">{movimentacao.descricao}</Descricao>
                                        {movimentacao.type === "entrada" ? (
                                            <Valor data-test="registry-amount" cor="green">{movimentacao.valor}</Valor>
                                        ) : (
                                            <Valor data-test="registry-amount" cor="red">{movimentacao.valor}</Valor>
                                        )}

                                    </Movimentacao>
                           
                            )
                        })}
                        <Saldo>
                            <p>SALDO</p>
                            {total > 0 ? (
                                <ValorTotal data-test="total-amount" cor = "green">{total}</ValorTotal>
                            ):(
                                <ValorTotal data-test="total-amount" cor = "red">{total}</ValorTotal>
                            )}
                            
                        </Saldo>
                    </WhiteBoard2>
                ) : (
                    <WhiteBoard>
                        <h1>Não há registros de entrada ou saída</h1>
                    </WhiteBoard>
                )}

                <Link to="/nova-entrada">
                    <NovaEntrada data-test="new-income">
                        <h1><AiOutlinePlusCircle color="white" fontSize="22px" /></h1>
                        <h2>Nova <br />entrada</h2>
                    </NovaEntrada>
                </Link>
                <Link to="/nova-saida">
                    <NovaSaida data-test="new-expense">
                        <h1><AiOutlineMinusCircle color="white" fontSize="22px" /></h1>
                        <h2>Nova <br />saída</h2>
                    </NovaSaida>
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
h1{
    width:304px;
}

`
const WhiteBoard = styled.div`
position: absolute;
box-sizing:border-box;
padding-left:73px;
padding-right:73px;
width: 326px;
height: 446px;
left: 25px;
top: 78px;
display:flex;
align-items:center;
justify-content:center;
background: #FFFFFF;
border-radius: 5px;
h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
}
`
const WhiteBoard2 = styled.div`
position: absolute;
box-sizing:border-box;
overflow:scroll;
padding-left:12px;
padding-right:12px;
padding-top:23px;
padding-bottom:42px;
width: 326px;
height: 446px;
left: 25px;
top: 78px;
background: #FFFFFF;
border-radius: 5px;
h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
}
`

const NovaEntrada = styled.div`
position: absolute;
width: 155px;
height: 114px;
left: 25px;
top: 537px;
background: #A328D6;
border-radius: 5px;
h1{
    position: absolute;
    left: 6.25%;
    right: 6.25%;
    top: 6.25%;
    bottom: 6.25%;
}
h2{
    position: absolute;
    width: 64px;
    height: 40px;
    left: 10px;
    top: 65px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
}
`
const NovaSaida = styled.div`
position: absolute;
width: 156px;
height: 114px;
left: 195px;
top: 537px;
background: #A328D6;
border-radius: 5px;
h1{
    position: absolute;
    left: 6.25%;
    right: 6.25%;
    top: 6.25%;
    bottom: 6.25%;
}
h2{
    position: absolute;
    width: 64px;
    height: 40px;
    left: 10px;
    top: 65px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
}
`

const Movimentacao = styled.div`
width:302px;
margin-bottom:20px;
display:flex;
`

const Date = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #C6C6C6;
margin-right:10px;
`
const Descricao = styled.div`
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #000000;
`
const Valor = styled.div`
position:absolute;
right:11px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
text-align: right;
color: ${props => props.cor};
`
const Saldo = styled.div`
position:fixed;
top:494px;
width:302px;
height:30px;
background-color:#FFFFFF;
display:flex;
border-radius:5px;
p{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
}
h1{
    position:absolute;
    right:11px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: right;
    color: ${props => props.cor};
}
`
const ValorTotal = styled.div`
    position:fixed;
    top:494px;
    left:300px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: right;
    color: ${props => props.cor};
`