pragma solidity ^0.4.17

contract Cores{
  string[] public cores;

  function Cores() public{
    cores.push("azul");
    cores.push("verde");

    string[] storage minhasCores = cores;
    minhasCores[1] = "amarelo";
  }
}
