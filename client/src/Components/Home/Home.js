import React, { Component } from "react";
import firebase from "../../Interfaces/Firebase";
import EventCard from "../layout/EventCard/EventCard";

class Home extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            events: [],
            listeners: []
        };
        this.uid = localStorage.getItem("uid");
    }

    componentWillMount() {
        let eventsRef = `users/${this.uid}/events`;
        this.setState({
            listeners: this.state.listeners.concat([eventsRef])
        });
        firebase.getData(eventsRef, (events) => {
            if (events.length < 1) {
                return;
            }
            let promises = [];
            for (const eventId of Object.keys(events)) {
                promises.push(new Promise((resolve, reject) => {
                    let eventRef = `events/${eventId}`;
                    firebase.getData(eventRef, (event) => {
                        event.seen = events[eventId].seen;
                        event.id = eventId;
                        this.setState({
                            listeners: this.state.listeners.concat([eventRef])
                        });
                        this.eventSeen(event);
                        resolve(event);
                    });
                }));
            }
            Promise.all(promises).then((eventObjs) => {
                this.setState({
                    events: eventObjs,
                    loading: false
                });
            });
        });
    }

    eventSeen(event) {
        if (!event.seen) {
            let eventsRef = `users/${this.uid}/events/${event.id}`;
            firebase.update(eventsRef, {seen: true});
        }
    }

    componentWillUnmount() {
        this.state.listeners.forEach((listener) => {
            firebase.detach(listener);
        });
    }

    handleDelete(event) {
        let ref = `users/${this.uid}/events/${event.id}`;
        firebase.deleteRef(ref);
        if (this.state.events.length === 1) {
            this.setState({loading: true, events: []});
        }
    }

    render() {
        let cards = [];
        this.state.events.forEach((event, i) => {
            cards.push(<EventCard key={i} event={event} />);
        });
        return (
            <div>
                {this.state.loading && <p>Nothing to see here</p>}
                {
                    this.state.events.reverse().map((event) => {
                        return (
                            <EventCard handleDelete={() => this.handleDelete(event)} key={event.id} event={event} />
                        );
                    })
                }
            </div>
        );
    }
}

export default Home;
