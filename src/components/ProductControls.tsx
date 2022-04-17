import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface Props {
  onIncrement: () => void;
  onDecrement: () => void;
}

const ProductControls: React.FC<Props> = ({ onIncrement, onDecrement }) => {
  return (
    <Flex border="none" borderRadius="4px">
      <IconButton
        colorScheme="red"
        flex={1}
        aria-label="decrement"
        icon={<Icon as={AiOutlineMinus} />}
        borderTopLeftRadius="4px"
        borderBottomLeftRadius="4px"
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        onClick={onDecrement}
      />
      <IconButton
        colorScheme="green"
        flex={1}
        aria-label="increment"
        icon={<Icon as={AiOutlinePlus} />}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        borderTopRightRadius="4px"
        borderBottomRightRadius="4px"
        onClick={onIncrement}
      />
    </Flex>
  );
};

export default ProductControls;
