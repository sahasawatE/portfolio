import { Grid, InputBase,Paper } from '@mui/material';
import {SearchIcon} from '@heroicons/react/outline'

export default function NavBar(){
    return(
        <div className='sticky z-50 top-0 w-auto backdrop-blur-md bg-opacity-75 bg-white'>
            <div className='grid grid-cols-2'>
                <div className='grid p-4'>
                    <div className='font-semibold text-zinc-600 my-auto pl-6'>MyPortfolio</div>
                </div>
                <div className='grid p-4 justify-end'>
                    <Paper elevation={0} style={{borderRadius:'12px'}} className='border-solid border-2 border-zinc-200 md:w-10/12 sm:w-40'>
                        <Grid container direction='row'>
                            <Grid item xs={2}><SearchIcon className='h-6 w-6 m-auto mt-1 text-zinc-300' /></Grid>
                            <Grid item xs={10} className='h-8 w-60 m-auto'><InputBase placeholder='Search...' type='text' /></Grid>
                        </Grid>
                    </Paper>
                </div>
                <div className='grid bg-red-400'></div>
            </div>
        </div>
    );
}