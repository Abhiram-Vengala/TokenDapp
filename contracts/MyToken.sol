// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface  IERC20 {
    function totalSupply()external  view returns (uint);
    function balanceOf(address account) external  view returns (uint balance);
    function allowance(address owner , address spender) external view returns (uint remaining);
    function approve (address spender , uint amount) external  returns (bool success);
    function transfer (address recipient , uint amount) external  returns (bool success);
    function transferFrom(address sender , address receiver , uint amount) external  returns (bool success);

    event Transfer(address indexed  from , address indexed to , uint value);
    event Approval(address indexed owner, address indexed spender , uint value); 
}

contract MyToken is IERC20{
    string public symbol;
    string public name;
    uint8 public decimals;
    uint public _totalSupply;

    mapping (address => uint) balances;
    mapping (address => mapping (address=>uint)) allowed;

    constructor(){
        symbol ="MTK";
        name = "MyToken";
        decimals = 18 ;
        _totalSupply = 1_001_000_000_000_000_000_000;
        balances[0x346a7D29872E65C64402DA0977155471494Da522]=_totalSupply;
        emit Transfer(address(0), 0x346a7D29872E65C64402DA0977155471494Da522 , _totalSupply);
    }
    
    function totalSupply() public view returns (uint) {
        return _totalSupply - balances[address(0)];
    }

    function balanceOf (address _account) public view returns (uint balance){
        return balances[_account];
    }

    function transfer (address recipient , uint amount) external  returns (bool success){
        require(balances[msg.sender]>=amount);
        balances[msg.sender] = balances[msg.sender]-amount;
        balances[recipient] = balances[recipient]+amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve (address spender , uint amount) external  returns (bool success){
        allowed[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender , address receiver , uint amount) external  returns (bool success){
        balances[sender] = balances[sender]-amount;
        allowed[sender][receiver]=allowed[sender][receiver] - amount;
        balances[receiver] = balances[receiver]+amount;
        emit Transfer(sender, receiver, amount);
        return true;
    }

    function allowance(address owner , address spender) external view returns (uint remaining){
        return allowed[owner][spender];
    }
    function Symbol() external view returns (string memory){
        return symbol;
    }
    function TokenName() external view returns (string memory){
        return name;
    }
}