import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const [isOperationActive, setIsOperationActive] = useState(false);

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber(null);
    setOperation(null);
    setIsResultDisplayed(false);
    setIsOperationActive(false);
  };

  const handleAddNumber = (num) => {
    if (isResultDisplayed || isOperationActive) {
      setCurrentNumber(num);
      setIsResultDisplayed(false);
      setIsOperationActive(false);
    } else {
      setCurrentNumber((prev) => (prev === '0' ? num : prev + num));
    }
  };

  const handleSetOperation = (op) => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
    } else if (operation && !isOperationActive) {
      const result = performCalculation(firstNumber, currentNumber, operation);
      setFirstNumber(result);
      setCurrentNumber(result);
    }
    setOperation(op);
    setIsOperationActive(true); // Marca que uma operação foi selecionada.
  };

  const performCalculation = (num1, num2, op) => {
    const first = Number(num1);
    const second = Number(num2);
    switch (op) {
      case '+':
        return String(first + second);
      case '-':
        return String(first - second);
      case '*':
        return String(first * second);
      case '/':
        return second !== 0 ? String(first / second) : 'Error';
      default:
        return '0';
    }
  };

  const handleEquals = () => {
    if (firstNumber !== null && operation && currentNumber !== '0') {
      const result = performCalculation(firstNumber, currentNumber, operation);
      setCurrentNumber(result);
      setFirstNumber(null);
      setOperation(null);
      setIsResultDisplayed(true);
      setIsOperationActive(false);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="/" onClick={() => handleSetOperation('/')} />
          <Button label="C" onClick={handleOnClear} />
          <Button label="*" onClick={() => handleSetOperation('*')} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleSetOperation('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleSetOperation('+')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
