import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

import api from "./api";
import ProductControls from "./components/ProductControls";
import useCart from "./hooks/useCart";
import { Product } from "./types";

function App() {
  const [{ cart, totalPrice, isOnCart }, { addToCart, increment, decrement }] =
    useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  return (
    <Stack
      minH="100vh"
      maxW="1250px"
      mx="auto"
      as="main"
      justify="space-between"
    >
      <Stack
        p="16px"
        fontSize="24px"
        fontWeight="bold"
        borderBottom="1px solid gainsboro"
        as="header"
        direction="row"
        justify="space-between"
      >
        <Heading>Estampitiency</Heading>
      </Stack>
      <SimpleGrid columns={[1, 2, 3]} gap="12px" p="16px" flex={1} as="section">
        {products.map((product) => (
          <Stack as="article" spacing="16px" key={product.id}>
            <Image
              objectFit="contain"
              src={product.image}
              alt="foto de estampita"
            />
            <Stack h="full" spacing="6px">
              <Heading fontSize="20px" fontWeight="500">
                {product.title}
              </Heading>
              <Text fontSize="15px" color="gray">
                {product.description}
              </Text>
            </Stack>
            {isOnCart(product.id) ? (
              <ProductControls
                onIncrement={() => increment(product.id)}
                onDecrement={() => decrement(product.id)}
              />
            ) : (
              <Button
                border="none"
                borderRadius="4px"
                mt="auto"
                fontSize="18px"
                colorScheme="messenger"
                lineHeight="48px"
                py="0"
                px="16px"
                onClick={() => addToCart(product)}
              >
                Agregar
              </Button>
            )}
          </Stack>
        ))}
      </SimpleGrid>
      <Center w="full" mx="auto" pb={4} position="sticky" bottom={0} as="aside">
        <Button
          boxShadow="0 0 10px rgba(0, 0, 0, 0.5);"
          colorScheme="messenger"
        >
          {cart.size} productos (total: {totalPrice})
        </Button>
      </Center>
      <Box
        textAlign="center"
        borderTop="1px solid gainsboro"
        p="16px"
        as="footer"
        color="gray"
      >
        Encontrá la consigna de este ejercicio y otros más{" "}
        <Link
          color="black"
          target="_blank"
          href="https://github.com/goncy/interview-challenges/tree/main/simple-cart"
        >
          acá
        </Link>
      </Box>
    </Stack>
  );
}

export default App;
