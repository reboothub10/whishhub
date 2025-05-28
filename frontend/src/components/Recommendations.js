import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Grid,
} from '@mui/material';

const RecommendationList = ({ recommendations, onAddWish }) => {
  if (!recommendations || recommendations.length === 0) {
    return <Typography>No recommendations available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {recommendations.map((groupObj, index) =>
        Object.entries(groupObj).map(([group, items]) => (
          <Grid item xs={12} md={6} lg={4} key={`${group}-${index}`}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group} Recommendations
                </Typography>
                <List dense>
                  {items.map((item, i) => (
                    <ListItem key={i} divider>
                      <ListItemText primary={item} />
                      <ListItemSecondaryAction>
                        <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                            backgroundColor: '#333',
                            },
                        }}
                        onClick={() => onAddWish(item)}
                        >
                        Add Wish
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RecommendationList;
