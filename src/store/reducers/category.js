const INITIAL_STATE = [
  {
    id: 1,
    title: 'Mobile Phones',
    imageUrl:
      'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    linkURL: 'shop/mobile-phones',
  },
  {
    id: 2,
    title: 'Tablets',
    imageUrl:
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    linkURL: 'shop/tablets',
  },
  {
    id: 3,
    title: 'Smart Watches',
    imageUrl:
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    linkURL: 'shop/smart-watches',
  },
  {
    id: 4,
    title: 'Fitnes Wrist',
    imageUrl:
      'https://images.pexels.com/photos/1300526/pexels-photo-1300526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    linkURL: 'shop/fitness-wrist',
    size: 'large',
  },
  {
    id: 5,
    title: 'Headphones',
    imageUrl:
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    linkURL: 'shop/headphones',
    size: 'large',
  },
];

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
