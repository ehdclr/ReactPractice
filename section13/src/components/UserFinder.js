import {Fragment, Component} from 'react';

import Users from './Users';
import classes from "./UserFinder.module.css"
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";


class UserFinder extends Component {
    static  contextType = UsersContext;

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: "",
        };
    }

    componentDidMount() {
        this.setState({filteredUsers: this.context.users});
    }

    //리액트에 의해 컾모넌트가 재평가 되면 호출됨
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))});
        }

    }

    searchChangeHandler(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (<Fragment>
            <div className={classes.finder}><input type='search' onChange={this.searchChangeHandler.bind(this)}
                                                   className={classes.finder}/></div>
            <ErrorBoundary>
                <Users users={this.state.filteredUsers}/>
            </ErrorBoundary>

        </Fragment>)
    }
}

// const UserFinder = () => {
//     const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//     const [searchTerm, setSearchTerm] = useState('');
//
//     useEffect(() => {
//         setFilteredUsers(
//             DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//         );
//     }, [searchTerm]);
//
//     const searchChangeHandler = (event) => {
//         setSearchTerm(event.target.value);
//     };
//
//     return (
//         <Fragment>
//             <input type='search' onChange={searchChangeHandler} className={classes.finder}/>
//             <Users users={filteredUsers} />
//         </Fragment>
//     );
// };

export default UserFinder;