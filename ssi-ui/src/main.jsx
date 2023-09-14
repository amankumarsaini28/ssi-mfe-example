import { bootstrap } from "ui-bom";

bootstrap(
    `
  <nav>
    <ul>
      <li>
        <a href="">Home</a>
      </li>
      <li>
        <a href="">Profile</a>
      </li>
    </ul>
  </nav>

  <view include="/api/layout/home" />  
`,
    document.getElementById("root")
);
