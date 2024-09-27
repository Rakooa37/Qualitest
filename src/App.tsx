import Navbar from './components/Navbar';
import { useEffect, useRef, useState } from 'react';
import useUsers from './services/useUsers';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserCard from './components/UserCard';
import { useSearchParams } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

function App() {
    const { fetchUsers, users } = useUsers();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [viewType, setViewType] = useState('grid');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const slideshowInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchUsers(`search?q=${searchQuery}`);

        return () => {
            if (slideshowInterval.current) {
                clearInterval(slideshowInterval.current);
            }
        };
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchParams({ search: query });
        if (query !== '') {
            fetchUsers(`search?q=${query}`);
        } else {
            fetchUsers();
        }
    };

    const startSlideshow = () => {
        if (!isSlideshowRunning && users.length > 0) {
            setIsSlideshowRunning(true);
            slideshowInterval.current = setInterval(() => {
                setFadeIn(false);
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length); 
                    setFadeIn(true); 
                }, 500);
            }, 2500);
        }
    };

    const stopSlideshow = () => {
        if (isSlideshowRunning) {
            setIsSlideshowRunning(false);
            if (slideshowInterval.current) {
                clearInterval(slideshowInterval.current);
                slideshowInterval.current = null;
            }
        }
    };

    return (
        <>
            <Navbar />

            <Box sx={{ m: 3, display: 'flex', justifyContent: 'space-between' }}>
  <TextField
    label="Search users by name"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    sx={{ mr: 2 }}
  />
  <FormControl
    variant="filled"
    sx={{
      minWidth: 200,
      bgcolor: 'white',
      color: 'black',
      borderRadius: 1,
      boxShadow: 1
    }}
  >
    <InputLabel
      htmlFor="input-id"
      sx={{
        color: 'black',
        fontWeight: 600
      }}
    >
      View
    </InputLabel>
    <Select
      value={viewType}
      onChange={(e) => setViewType(e.target.value)}
      aria-label="Dropdown view options"
      label="View"
      inputProps={{ id: 'input-id' }}
      variant="filled"
      sx={{
        color: 'black',
        bgcolor: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'gray',
        },
        '& .MuiSvgIcon-root': {
          color: 'black',
        },
      }}
    >
      <MenuItem value="grid" sx={{ color: 'black' }}>Grid</MenuItem>
      <MenuItem value="list" sx={{ color: 'black' }}>List</MenuItem>
    </Select>
  </FormControl>
</Box>

            <Box sx={{ flexGrow: 1, m: 3 }}>
                {users.length > 0 ? (
                    viewType === 'grid' ? (
                        <Grid container spacing={2} justifyContent="center">
                            {users?.map((el: any) => (
                                <Grid
                                    item
                                    key={el.id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                >
                                    <UserCard
                                        id={el.id}
                                        username={el.username}
                                        image={el.image}
                                        firstName={el.firstName}
                                        lastName={el.lastName}
                                        email={el.email}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems='center'>
                            {users?.map((el: any) => (
                                <Grid item key={el.id} xs={12}>
                                    <UserCard
                                        size='md'
                                        id={el.id}
                                        username={el.username}
                                        image={el.image}
                                        firstName={el.firstName}
                                        lastName={el.lastName}
                                        email={el.email}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )
                ) : (
                    // Show this message when no users are available
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <Typography variant="h6" color="textSecondary">
                            No users to show.
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ mt: 4 }}></Divider>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button disabled={isSlideshowRunning} variant="outlined" onClick={startSlideshow} sx={{ mx: 1 }} startIcon={<PlayArrowIcon />}>
                        Start Slideshow
                    </Button>
                    <Button disabled={!isSlideshowRunning} variant="outlined" onClick={stopSlideshow} sx={{ mx: 1 }} startIcon={<StopIcon />}>
                        Stop Slideshow
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    {users.length > 0 && (
                        <UserCard
                            fadeIn={fadeIn}
                            size={'md'}
                            id={users[currentIndex].id}
                            username={users[currentIndex].username}
                            image={users[currentIndex].image}
                            firstName={users[currentIndex].firstName}
                            lastName={users[currentIndex].lastName}
                            email={users[currentIndex].email}
                        />
                    )}
                </Box>
            </Box>
        </>
    );
}

export default App;
