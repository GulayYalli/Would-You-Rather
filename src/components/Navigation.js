import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return ( 
        <nav className='nav'>    
            <NavLink to='/' exact activeClassName='active'>
                Home
            </NavLink>
            <NavLink to='/add' activeClassName='active'>
                New Question
            </NavLink>
            <NavLink to='/leaderboard' activeClassName='active'>
                Leader Board
            </NavLink>
        </nav>
     );
}
 
export default Navigation;