const initialState = {
  data: [
    {
      title: 'work 1',
      details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil suscipit corrupti mollitia animi a, ullam fugiat consequuntur accusantium ipsa voluptatem voluptatum odit facere officiis cupiditate iusto quasi facilis quaerat veritatis quam aliquam repudiandae et deleniti! Eum nostrum aliquid, porro, voluptatum tempora dignissimos aperiam vero ad labore odio corporis ab est!',
      category: 'work',
      id: 2
    },
    {
      title: 'reminder 1',
      details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil suscipit corrupti mollitia animi a, ullam fugiat consequuntur accusantium ipsa voluptatem voluptatum odit facere officiis cupiditate iusto quasi facilis quaerat veritatis quam aliquam repudiandae et deleniti! Eum nostrum aliquid, porro, voluptatum tempora dignissimos aperiam vero ad labore odio corporis ab est!',
      category: 'reminders',
      id: 3
    },
    {
      title: 'pay the bill',
      details: 'Pay rent',
      category: 'money',
      id: 4
    },
    {
      title: 'work 2',
      details: 'HongJiao on Wednesday',
      category: 'work',
      id: 5
    },
    {
      title: 'grocery shopping',
      details: 'Buy 🍉 ',
      category: 'todos',
      id: 6
    }
  ]
};

const search = (state = initialState, action) => {
  return state;
}

export default search