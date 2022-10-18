import Image from "../assets/pexels-photo-1308648.jpeg";

export default function Home() {
    return (
      <div>
        <div>
            Najpopularniejsze
        </div>
        <div>
            <img src={Image} width="700" height="500"></img>
        </div>
      </div>
    );
  }