fetch("data.json")
  .then((res) => {
    let data = res.json();
    return data;
  })
  .then((data) => {
    // define the imges
    let imges = document.querySelectorAll(".img .main-img");
    //defint the catigores
    let catigores = document.querySelectorAll(".text .catigores");
    // define the names
    let names = document.querySelectorAll(".text .name");
    // define the prices
    let prices = document.querySelectorAll(".text .price");
    // define the query that a want to change the imge when matches
    let x = window.matchMedia("(max-width:650px)");
    // change the vlaues
    for (let i = 0; i < imges.length; i++) {
      if (window.innerWidth > 650) {
        // desktop img size
        imges[i].src = `${data[i].image.desktop}`;
      } else {
        // mobile img size
        imges[i].src = data[i].image.mobile;
      }
      // get the catigores values
      catigores[i].textContent = data[i].category;
      //get the names values
      names[i].textContent = data[i].name;
      //get the prices  values
      prices[i].textContent = "$" + data[i].price.toFixed(2);
      // make sure to change the imge when the width is changing
      x.addEventListener("change", function () {
        if (x.matches) {
          imges[i].src = data[i].image.mobile;
        } else {
          imges[i].src = data[i].image.desktop;
        }
      });
      ////////////////////////
      // //create the order div
      let order = document.createElement("div");
      order.className = "order";
      //creat the text and the cancel button
      let text = document.createElement("div");
      text.className = "text";
      ///creat the text's children
      // creat the h4
      let textH4 = document.createElement("h4");
      textH4.className = "text-h4";
      textH4.textContent = data[i].name;
      //creat the spans
      // amount span
      let amountSpan = document.createElement("span");
      amountSpan.className = "amount-span";
      amountSpan.textContent = "1x";
      // price span
      let priceSpan = document.createElement("span");
      priceSpan.className = "price-span";
      priceSpan.textContent = "$" + data[i].price.toFixed(2);
      // creat the cancel button
      let cancelbutton = document.createElement("span");
      cancelbutton.className = "cancel";
      cancelbutton.textContent = "x";
      // Append the children to the text
      text.append(textH4);
      text.append(amountSpan);
      text.append(priceSpan);
      //Append the text to the order div
      order.append(text);
      order.append(cancelbutton);
      // append the order to the carts div
      // defien the carts
      let carts = document.querySelector(".carts");
      carts.append(order);
    }
    // creat the totalprice div
    let totalOrder = document.createElement("div");
    totalOrder.className = "Total-order";
    //creat the totalprice's children
    // create the p
    let ptoTalPrice = document.createElement("p");
    ptoTalPrice.textContent = "Order Total";
    //creat the span
    let spanTotalPrice = document.createElement("span");
    spanTotalPrice.className = "Total-price";
    // append the children to to totalOrder
    totalOrder.append(ptoTalPrice);
    totalOrder.append(spanTotalPrice);

    // creat the carbon natuarl
    let carbon = document.createElement("div");
    carbon.className = "carbon";
    // creat the carbon img
    let carbonImg = document.createElement("img");
    carbonImg.className = "carbonImg";
    carbonImg.src = "./assets/images/icon-carbon-neutral.svg";
    //creat the p carbon
    let carbonP = document.createElement("p");
    carbonP.className = "carbonP";
    carbonP.textContent = "This is a carbon-neutral delivery";
    // append the p and img carbon
    carbon.append(carbonImg);
    carbon.append(carbonP);
    //creat the confirm button
    let confirm = document.createElement("button");
    confirm.className = "confirm";
    confirm.textContent = "Confirm Order";
    // append to carts div
    document.querySelector(".carts").append(totalOrder);
    document.querySelector(".carts").append(carbon);
    document.querySelector(".carts").append(confirm);
  });
//define the content of add newitmes

setTimeout(function () {
  let imgesSrc = new Set([]);
  //define the block display orders
  let blockorder = new Set([]);
  /// define the order div as list
  let orders = document.querySelectorAll(".order");
  //define the add button
  let adds = document.querySelectorAll(".Add");
  adds.forEach((add) => {
    add.addEventListener("click", (e) => {
      add.querySelector("span.countet").style.display = "block";
      //delete the img of shoping
      add.querySelector(".shop").style.display = "none";
      //delete the paragraph
      add.querySelector("p").style.display = "none";
      let increment = add.querySelector(".increment");
      increment.style.display = "block";
      let decrement = add.querySelector(".decrement");
      decrement.style.display = "block";
      // change the background color
      add.style.backgroundColor = "rgb(183, 61, 22)";
      add.style.justifyContent = "space-between";
      add.style.fontSize = "15px";
      add.style.color = "white";

      let orderedContent = document.querySelector(".ordered-content");

      orderedContent.style.display = "none";

      // define the count of orderd

      // start show the order div when click on its img
      orders.forEach((order) => {
        if (
          order.querySelector(".text-h4").textContent ===
          add.parentElement.parentElement.querySelector(".name").textContent
        ) {
          order.style.display = "block";
        }
      });
      // End show the order div when click on its img
      //create array to get the numbers of block orders
      const bolcks = [];
      let totalprice = 0;
      orders.forEach((order) => {
        if (order.style.display === "block") {
          bolcks.push(order);
          blockorder.add(order);
          totalprice += +order
            .querySelector(".price-span")
            .textContent.slice(1);

          let spanTotal = document.querySelector(".Total-price");
          spanTotal.textContent = "$" + totalprice.toFixed(2);
        }
      });
      bolcks.forEach((block) => {
        fetch("/data.json")
          .then((res) => {
            let data = res.json();
            return data;
          })
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (
                data[i].name === block.querySelector(".text-h4").textContent
              ) {
                imgesSrc.add(data[i].image.thumbnail);
              }
            }
          });
      });
      // change the counter value when add a new order
      let countOforder = document.querySelector(".countOforder");
      countOforder.textContent = bolcks.length;

      // change the total order div display
      let pt = document.querySelector(".Total-order");
      pt.style.display = "flex";

      // change the color depends on the price
      if (document.querySelector(".Total-price").textContent.slice(1) <= 50) {
        document.querySelector(".Total-price").style.color = "green";
      } else if (
        document.querySelector(".Total-price").textContent.slice(1) > 50 &&
        document.querySelector(".Total-price").textContent.slice(1) < 100
      ) {
        document.querySelector(".Total-price").style.color = "#1c366f";
      } else if (
        document.querySelector(".Total-price").textContent.slice(1) > 100
      ) {
        document.querySelector(".Total-price").style.color = "#d21111";
      }
      document.querySelector(".carbon").style.display = "flex";
      document.querySelector(".confirm").style.display = "block";
    });
    // define the + and - buttons
    let plusORminas = [...add.querySelectorAll("img")];
    //redefine the span and the decremment
    let span = add.querySelector("span.countet");
    let decrement = add.querySelector(".decrement");
    // remove the shop imge
    plusORminas.shift();
    // incremnt and decremnt when click on them
    plusORminas.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.className === "increment") {
          span.textContent = parseInt(span.textContent) + 1;
          orders.forEach((order) => {
            if (
              order.querySelector(".text-h4").textContent ===
              add.parentElement.parentElement.querySelector(".name").textContent
            ) {
              // start get the origin price
              let originPrice = add.parentElement.parentElement
                .querySelector("h4.price")
                .textContent.slice(1);
              // end get the origin price
              //  Start get amoundPrice
              order.querySelector(".amount-span").textContent =
                span.textContent + "x";
              // End get amoundPrice
              let priceSpan = order.querySelector(".price-span");
              priceSpan.textContent = `$${(
                +priceSpan.textContent.slice(1) + +originPrice
              ).toFixed(2)}`;
            }
          });
          // show the + sign
          if (span.textContent >= 1) {
            decrement.style.opacity = "1";
            decrement.style.pointerEvents = "inherit";
          }
        } else if (button.className === "decrement") {
          span.textContent = parseInt(span.textContent) - 1;
          orders.forEach((order) => {
            if (
              order.querySelector(".text-h4").textContent ===
              add.parentElement.parentElement.querySelector(".name").textContent
            ) {
              // start define the origin prcie
              let originPrice = add.parentElement.parentElement
                .querySelector("h4.price")
                .textContent.slice(1);
              // end define the origin prcie
              //  Start get amoundPrice
              order.querySelector(".amount-span").textContent =
                span.textContent + "x";
              //  End get amoundPrice
              let priceSpan = order.querySelector(".price-span");
              priceSpan.textContent = `$${(
                priceSpan.textContent.slice(1) - originPrice
              ).toFixed(2)}`;
            }
          });
          //ceack if the counter is less or = to 1
          opacityPointerNone();
        }
      });
      //  Start function
      function opacityPointerNone() {
        if (span.textContent <= 1) {
          decrement.style.opacity = "0";
          decrement.style.pointerEvents = "none";
        }
      }
      //  End function
      //ceack if the counter is less or = to 1
      opacityPointerNone();
    });
  });

  // define the counter
  let countOforder = document.querySelector(".countOforder");
  // remove the price of the canceld order from the total price
  let cancels = document.querySelectorAll(".cancel");
  cancels.forEach((cancel) => {
    cancel.addEventListener("click", () => {
      cancel.parentElement.style.display = "none";
      document.querySelector(".Total-price").textContent = `$${(
        +document.querySelector(".Total-price").textContent.slice(1) -
        +cancel.parentElement.querySelector(".price-span").textContent.slice(1)
      ).toFixed(2)}`;

      // remove 1 form the counter when cancel order
      countOforder.textContent -= 1;
      if (document.querySelector(".countOforder").textContent === "0") {
        document.querySelector(".Total-order").style.display = "none";
        document.querySelector(".confirm").style.display = "none";
        document.querySelector(".carbon").style.display = "none";
        document.querySelector(".ordered-content").style.display = "block";
      }
    });
  });
  // define the confrim button
  //redefine the imgsec ass array
  //redfine blockorder as array
  let confirmbutton = document.querySelector(".confirm");
  //defien the confirm message
  let confirmMessage = document.querySelector(".confirm-meesage");

  confirmbutton.addEventListener("click", () => {
    //appen the img and the block
    imgesSrc = [...imgesSrc];
    blockorder = [...blockorder];
    //clone the total price div
    let clonedTotalPrice = document
      .querySelector(".Total-order")
      .cloneNode(true);
    // creat the container of the text and the img
    for (let i = 0; i < blockorder.length; i++) {
      let container = document.createElement("div");
      container.className = "container";
      container.style.display = "flex";
      //creat the img
      let confirmedimg = document.createElement("img");
      confirmedimg.className = "confirmedimg";
      confirmedimg.src = `${imgesSrc[i]}`;
      //clone the text from the order
      let clonedText = blockorder[i].querySelector(".text").cloneNode(true);
      //add the img then the text to the container
      container.append(confirmedimg);
      container.append(clonedText);
      //append the container to the confirmMessage
      confirmMessage.append(container);
      confirmMessage.append(clonedTotalPrice);
      document.querySelector(".overlay").style.display = "block";
      confirmMessage.style.display = "block";
      confirmMessage.scrollIntoView({ behavior: "smooth" });
    }
    //creat the refresh button
    let refreshButton = document.createElement("button");
    refreshButton.className = "refreshButton";
    refreshButton.textContent = "Start New Order";
    confirmMessage.append(refreshButton);
    confirmMessage.addEventListener("click", () => {
      document.location.reload();
    });
  });
}, 700);
