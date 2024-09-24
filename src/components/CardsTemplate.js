import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
  

function CardsTemplate({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
//   const { setNodeRef } = useDroppable({ id })
  const style = {
    // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transform: CSS.Translate.toString(transform),
    position: 'relative',
    zIndex: isDragging ? 10 : 0,
    transition
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} useDragOverlay={false}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'white'}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Card {id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This is card number {id}.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
  );
}

export default CardsTemplate;
