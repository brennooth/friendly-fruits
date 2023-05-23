import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// because we're using webpack, we have to import our stock images this way
import apple from './images/apple.jpg';
import banana from './images/banana.jpg';
import kiwi from './images/kiwi.jpg';
import lemon from './images/lemon.jpg';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:8000/products', {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  // normally we would store images as a BLOB in the database, but this will have to do for now
  const getImage = (product) => {
    switch (product) {
      case 'Apple': {
        return apple;
      }
      case 'Banana': {
        return banana;
      }
      case 'Kiwi': {
        return kiwi;
      }
      case 'Lemon': {
        return lemon;
      }
      default:
        return;
    }
  };

  const addToCart = (e, product) => {
    e.preventDefault();
    alert(product.name + ' added to cart!');
  };

  const output = loading ? (
    <div>loading</div>
  ) : (
    <div>
      <Grid container spacing={2}>
        {products.map((product) => {
          return (
            <Grid item xs={3} md={3} key={product.article_no}>
              <Card sx={{ maxWidth: 345, height: 320 }}>
                <CardMedia sx={{ height: 140 }} image={getImage(product.name)} title={product.name} />
                <CardContent sx={{ height: 100 }}>
                  <Grid item xs={6} justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography gutterBottom variant="caption" color="text.secondary" component="div">
                      Article-No.: {product.article_no}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions style={{ padding: '1em', marginLeft: '12em' }}>
                  <Typography sx={{ paddingBottom: '1.5em' }} variant="body">
                    {product.price}€
                  </Typography>
                  <Button style={{ paddingBottom: '2em', marginRight: '1em' }} onClick={(e) => addToCart(e, product)}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );

  return <div>{output}</div>;
}

export default Products;
