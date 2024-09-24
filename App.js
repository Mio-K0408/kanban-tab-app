import './App.css';
import Header from "./components/Header";
import CardsTemplate from "./components/CardsTemplate";
import BottomButtons from './components/BottomButtons';
import Footer from "./components/Footer";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500]
    },
    secondary: {
      main: "#78909c"
    }
  }
});

const footerStyle = {
  bottom: 0,
}

function App() {
  const [cards, setCards] = useState({
    tab1: [1, 2],
    tab2: [3, 4],
    tab3: [5, 6],
    tab4: [7, 8],
    tab5: [9, 10]
  });
  const [activeTab, setActiveTab] = useState("tab1");

  const addCard = () => {
    setCards(prevCards => ({
      ...prevCards,
      [activeTab]: [...prevCards[activeTab], prevCards[activeTab].length + 1]
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCards((prevCards) => {
        const oldIndex = prevCards[activeTab].indexOf(active.id);
        const newIndex = prevCards[activeTab].indexOf(over.id);
        const newOrder = arrayMove(prevCards[activeTab], oldIndex, newIndex);
        return {
          ...prevCards,
          [activeTab]: newOrder
        };
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Grid container direction="column">
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} mx={3}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="kanban tabs">
                <Tab label="Tab 1" value="tab1" />
                <Tab label="Tab 2" value="tab2" />
                <Tab label="Tab 3" value="tab3" />
                <Tab label="Tab 4" value="tab4" />
                <Tab label="Tab 5" value="tab5" />
              </Tabs>
            </Box>
            <Box mt={2} mx={3}>
              <SortableContext items={cards[activeTab]} strategy={rectSortingStrategy}>
                <Grid container spacing={2}>
                  {cards[activeTab].map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={card}>
                      <CardsTemplate id={card} />
                    </Grid>
                  ))}
                </Grid>
              </SortableContext>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} mx={3} mb={8}>
              <BottomButtons addCard={addCard} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Footer style={footerStyle} />
          </Grid>
        </Grid>
      </DndContext>
    </ThemeProvider>
  );
}

export default App;
