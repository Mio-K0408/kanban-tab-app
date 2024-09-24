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
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDroppable } from '@dnd-kit/core';

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
};

function DroppableTab({ id, label, activeTab, handleTabChange }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <Tab
      ref={setNodeRef}
      label={label}
      value={id}
      style={{ backgroundColor: isOver ? '#cfd8dc' : undefined }}
      onClick={() => handleTabChange(null, id)}
    />
  );
}

function App() {
  const [cards, setCards] = useState({
    tab1: [1, 2],
    tab2: [3, 4],
    tab3: [5, 6],
    tab4: [7, 8],
    tab5: [9, 10]
  });
  const [nextId, setNextId] = useState(11); // 次に追加するカードのIDを管理
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeId, setActiveId] = useState(null);

  const addCard = () => {
    setCards(prevCards => ({
      ...prevCards,
      [activeTab]: [...prevCards[activeTab], nextId]
    }));
    setNextId(prevId => prevId + 1); // カード追加ごとにIDをインクリメント
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over && typeof over.id === 'string' && over.id.startsWith("tab")) {
      const tabValue = over.id;
      if (tabValue !== activeTab) {
        setActiveTab(tabValue);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTabKey = Object.keys(cards).find(key => cards[key].includes(active.id));
    const overTabKey = Object.keys(cards).find(key => cards[key].includes(over.id)) || over.id;

    if (activeTabKey && overTabKey) {
      if (activeTabKey === overTabKey) {
        setCards((prevCards) => {
          const oldIndex = prevCards[activeTabKey].indexOf(active.id);
          const newIndex = prevCards[overTabKey].indexOf(over.id);
          const newOrder = arrayMove(prevCards[activeTabKey], oldIndex, newIndex);
          return {
            ...prevCards,
            [activeTabKey]: newOrder
          };
        });
      } else {
        setCards((prevCards) => {
          const activeItems = prevCards[activeTabKey].filter(item => item !== active.id);
          const overItems = [...prevCards[overTabKey], active.id];
          return {
            ...prevCards,
            [activeTabKey]: activeItems,
            [overTabKey]: overItems
          };
        });
      }
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
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container direction="column">
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Box mt={10} mx={3}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="kanban tabs">
                <DroppableTab id="tab1" label="Tab 1" activeTab={activeTab} handleTabChange={handleTabChange} />
                <DroppableTab id="tab2" label="Tab 2" activeTab={activeTab} handleTabChange={handleTabChange} />
                <DroppableTab id="tab3" label="Tab 3" activeTab={activeTab} handleTabChange={handleTabChange} />
                <DroppableTab id="tab4" label="Tab 4" activeTab={activeTab} handleTabChange={handleTabChange} />
                <DroppableTab id="tab5" label="Tab 5" activeTab={activeTab} handleTabChange={handleTabChange} />
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

        <DragOverlay>
          {activeId ? <CardsTemplate id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </ThemeProvider>
  );
}

export default App;
