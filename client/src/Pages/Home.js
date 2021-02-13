import React from 'react';
import '../CSS/Home.css';
import { apiHost } from '../Utils/Constants';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageCount: 0,
            currentPage: 1,
            currentItems: [],
        };
    }

    componentDidMount() {
        this.fetchUsers(1);
    }

    onClick = (nextPage) => () => {
        const { pageCount } = this.state;
        console.log("onCLick", nextPage)
        if (nextPage > 0 && nextPage <= pageCount) {
            this.fetchUsers(nextPage);
        }
    }

    fetchUsers(page) {
        fetch(`${apiHost}/users?page=${page}`, { method: 'GET' })
            .then(response => response.json())
            .then(({ count, rows }) => {
                console.log("fetchUsers", count, rows)
                this.setState({ pageCount: count, currentItems: rows, currentPage: page });
            });
    }

    render() {
        const { pageCount, currentPage, currentItems } = this.state;
        console.log("render", pageCount, currentPage, currentItems)
        return (
            <div className="container">
                <h3>List of Users</h3>
                <div className="card-footer pb-0 pt-3">
                    {currentItems && currentItems.length &&
                        <div className="page-nav-container">
                            <button
                                title="Previous Page"
                                className={"page-nav " + ((currentPage === 1) ? "disabled" : "")}
                                onClick={this.onClick(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <button
                                title="Current Page"
                                style={{ backgroundColor: 'white' }}
                                className="page-nav disabled"
                            >
                                {currentPage}
                            </button>
                            <button
                                title="Next Page"
                                className={"page-nav " + ((currentPage === pageCount) ? "disabled" : "")}
                                onClick={this.onClick(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    }
                </div>
                <div className="table-container">
                    <table className="user-list">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}