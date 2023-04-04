export default function Greeting() {
    const time = new Date().getHours()

    return <h2>{
        time >= 5 && time < 12
            ? "Good morning"
            : time >= 12 && time < 18
                ? "Good afternoon"
                : "Good evening"
    }</h2>
}
