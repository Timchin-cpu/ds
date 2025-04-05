import { useState } from "react";
import { getTotalPrice } from "./utils";

const useCart = (tg, openModal) => {
  const [addedItems, setAddedItems] = useState([]);

  const updateMainButton = (items) => {
    if (items.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(items)}`,
      });
    }

    // Добавляем обработчик клика для MainButton, который открывает модальное окно
    tg.MainButton.onClick(() => {
      openModal();
    });
  };

  const onAdd = (product) => {
    const existingItemIndex = addedItems.findIndex(
      (item) => item.id === product.id
    );
    let newItems = [...addedItems];

    if (existingItemIndex > -1) {
      newItems[existingItemIndex].quantity += 1;
    } else {
      newItems.push({ ...product, quantity: 1 });
    }

    setAddedItems(newItems);
    updateMainButton(newItems);
  };

  const onRemove = (product) => {
    const existingItemIndex = addedItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      let newItems = [...addedItems];
      newItems[existingItemIndex].quantity -= 1;

      if (newItems[existingItemIndex].quantity <= 0) {
        newItems.splice(existingItemIndex, 1);
      }

      setAddedItems(newItems);
      updateMainButton(newItems);
    }
  };
  tg.MainButton.onClick(() => {
    openModal(); // Открываем модальное окно
  });

  return { addedItems, onAdd, onRemove };
};

export default useCart;
