import { defineComponent } from "vue";
import "./App.css";

const App = defineComponent({
  render() {
    return (
      <div id="entry">
        <router-view />
      </div>
    )
  }
})

export default App
