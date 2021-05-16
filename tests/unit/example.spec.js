import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import Table from "@/views/Table.vue";
import Menu from "../../src/components/front/Menu.vue";
import Login from "../../src/components/front/Login.vue";

describe("Menu", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(Menu);
    expect(wrapper.text()).toContain("Login Content Set paths About");
    console.log(wrapper);
  });
});
describe("Login page", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(Table);
    expect(wrapper.text()).toContain("Welcome Login");
    console.log(wrapper);
  });
});

// describe("Table.vue", () => {
//   it("Check classes", () => {
//     shallowMount(Table);
//   });
// });
