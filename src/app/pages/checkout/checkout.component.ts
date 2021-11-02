/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-labels */
/* eslint-disable no-debugger */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import { PaymentsService } from './../../services/payments.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address/address';
import * as braintree from 'braintree-web-drop-in';
import { AuthResponded } from 'src/app/models/auth/auth';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Item } from 'src/app/models/item/item';
import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';
import { ShippingMethod } from 'src/app/models/shipping-method/shipping-method';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { Stripe } from 'stripe-angular';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { CartItem } from 'src/app/dtos/cart-item/cart-item';
import { CartModel } from 'src/app/models/cart/cart-model';
import { CartItemModel } from 'src/app/models/cart/cart-item-model';
import { ShippingAdressService } from 'src/app/services/shipping-adress/shipping-adress.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/models/order/order';
import { OrderDto } from 'src/app/dtos/orders/order-dto';
import { OrderItem } from 'src/app/dtos/orders/order-item';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { BankAccount } from 'src/app/models/payment/bank-account';
import { CreditCard } from 'src/app/models/payment/credit-card';
import { OrderItemsService } from 'src/app/services/orders/order-items.service';
import { ShipmentService } from 'src/app/services/shipments/shipment.service';
import { promise } from 'selenium-webdriver';
import { StripePaymentDto } from 'src/app/dtos/payment/stripe-payment-dto';
import { PaymentInfoDto } from 'src/app/dtos/payment/payment-info';
import { TransactionDto } from 'src/app/dtos/payment/transaction-dto';
import { ClientToken } from 'src/app/dtos/payment/client-token';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ReloadRouteComponent } from 'src/app/components/reload-route/reload-route.component';
// import { LoaderService } from 'src/app/loader/loader.service';
// import { ShippingMethod } from 'src/app/dtos/order/shipping-method';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  ShippingAdressForm: FormGroup;
  testForm: FormGroup;
  ibanForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  currentUser: any;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  idCart: any;
  stripe: any;
  totalTax = 20;
  shippingTax: Number = 20;
  card;
  token;
  pbKey;
  orderNumber;
  items: CartItem[] = [];
  cart: CartModel;
  errorMessage: any;
  errorMessages: String | undefined;
  title = 'Billing';
  panelOpenState = false;
  ShippingAdress: ShippingAddress;
  shippingAdresses: ShippingAddress[];
  bankAccounts: BankAccount[];
  creditCards: CreditCard[];
  selected: string;
  setShipAdressForm: FormGroup;
  shipAdress: any;
  orderItem: OrderItem[];
  shippingAdressesForActicles = [];
  orderId: any;
  shipments: any[];
  payInfos: PaymentInfoDto;
  rates: any[];
  cartItems: CartItem[] = [];
  setRates: FormGroup;
  shippingMethodForActicles = [];
  updatedItems: OrderItem[] = [];
  choose_payment: FormGroup;
  info: StripePaymentDto;
  stripeToken: any;
  place_order = false;
  is_card = false;
  is_paypal = false;
  is_bank = false;
  somme: any;
  paypalToken: ClientToken | undefined;
  adressDefault = 'Choose shipping adress';
  shipDefault = 'Choose shipping method';
  bank: any;

  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationsService,
    private orderService: OrdersService,
    private router: Router,
    private payment: PaymentService,
    private i18nServiceService: I18nServiceService,
    private shippingAdressService: ShippingAdressService,
    private orderItemService: OrderItemsService,
    private shipmentService: ShipmentService,
    private paymentService: PaymentsService // public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      console.dir(this.cartData);
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.initForm('', '');
    this.initIbanForm();

    this.ShippingAdressForm = this.formBuilder.group({
      fullname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, Validators.required],
      zipcode: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      use_default: [false],
    });

    // if (this.currentUser) {
    //   this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
    //     const user: AuthResponded = data.body;
    //     this.ShippingAdressForm.patchValue({
    //       fullname: user['user'].fullname,
    //       email: user['user'].email,
    //       state: user['user'].address.state,
    //       zip: user['user'].address.zipcode,
    //       country: user['user'].address.country,
    //       address: user['user'].address.street,
    //       city: user['user'].address.state,
    //     });
    //   });
    // }

    this.setShipAdressForm = this.formBuilder.group({
      ship_adress: ['', Validators.required],
    });

    this.setRates = this.formBuilder.group({
      _rates: ['', Validators.required],
    });

    this.choose_payment = this.formBuilder.group({
      payment_method: ['', Validators.required],
    });

    this.allShippingAdress();
    this.getCreditCards();
    this.getBankAccount();
    // this.updateCartOnServer();
    this.resetCart();
    // this.selected = this.shippingAdresses[-1].name + ', ' + this.shippingAdresses[-1].city;
  }

  getClientToken() {
    this.paymentService.getBraintreeClientToken(this.token).subscribe(
      (res) => {
        // this.paypalToken.client_token = res.body.token;
        // console.dir(this.paypalToken, "Get paypal token success !");
        this.createBraintreeUI(res.body.client_token);
      },
      (err) => {
        console.dir(err, 'Get paypal token error !');
      }
    );
  }

  createBraintreeUI(token: string) {
    // let button = document.querySelector('#submit-button');
    let amount = this.cartTotal;
    // console.dir(this.paypalToken?.client_token);
    braintree.create(
      {
        authorization: token,
        container: '#paypal',
        card: false,
        paypal: {
          flow: 'checkout',
          amount: amount,
          currency: 'EUR',
        },
      },
      (createErr, instance) => {
        if (createErr) {
          console.dir(createErr);
          return;
        }

        instance?.requestPaymentMethod((requestPaymentMethodErr, payload) => {
          if (requestPaymentMethodErr) {
            console.dir(requestPaymentMethodErr);
            return;
          }

          const data = new TransactionDto();
          data.nonce = payload.nonce;
          data.device_data = payload.deviceData;
          data.amount = amount;
          debugger;
          this.paymentService.braintreeTransactionSale(this.token, data).subscribe(
            (response) => {
              console.dir(response);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Payment has been made !',
                showConfirmButton: false,
                timer: 2000,
              });
              this.cartService.deleteCart();
              this.router.navigate(['/orders']);
            },
            (error) => console.error(error)
          );
        });
      }
    );
  }

  getCartDto() {
    let items: CartItem[] = [];
    this.cartData.data.forEach((element) => {
      const item: CartItem = {
        product: element.product.id.toString(),
        quantity: element.numInCart,
      };
      items.push(item);
    });

    return items;
  }

  updateCart(data) {
    let cart = new CartModel();
    cart.id = data.id;
    cart.items = [];

    data.items.forEach((element) => {
      let item = new CartItemModel();
      item.id = element.id;
      item.product = element.product;
      item.quantity = element.quantity;
      cart.items.push(item);
    });

    return cart;
  }

  updateCartOnServer() {
    this.items = this.getCartDto();

    console.dir(this.items, 'Update cart on server');
    this.cartService.get(this.token).subscribe((res) => {
      this.cart = this.updateCart(res.body);
      this.cartService.update(this.token, this.items, this.cart.id).subscribe(
        (response) => {
          this.cart = response.body;
          console.dir(this.items, 'Update cart on server');
          // console.dir("Cart :");
          console.dir(this.cart, 'cart');
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  initIbanForm() {
    this.ibanForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    });
  }

  initForm(amount, orderNumber) {
    this.testForm = this.formBuilder.group({
      amount: ['Amount : ' + amount, Validators.required],
      orderNumber: ['Order number : ' + orderNumber, Validators.required],
    });
  }

  // registerElements(elements) {

  //   // let errorMessage = $('#errorMessage');
  //   // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  //   elements.forEach(function(element) {
  //       element.on('change', (event) => {
  //           if(event.error) {
  //               this.errorMessage.html(`<p>${event.error.message}</p>`);
  //               this.errorMessage.show();
  //           } else {
  //             this.errorMessage.hide();
  //           }
  //       });
  //   });
  // }

  initStripeForm() {
    if (this.payInfos.paymentMethod === 'card') {
      const elements = this.stripe.elements();
      // eslint-disable-next-line no-var

      let style = {
        base: {
          color: '#32325d',

          fontFamily: 'Raleway, sans-serif',

          fontSmoothing: 'antialiased',

          fontSize: '16px',

          '::placeholder': {
            color: '#32325d',
          },

          invalid: {
            fontFamily: 'Arial, sans-serif',

            color: '#fa755a',

            iconColor: '#fa755a',
          },
        },
      };

      this.card = elements.create('card', { hidePostalCode: true, style: style });

      this.card.mount('#card-element');

      this.card.on('change', function (event) {
        // Disable the Pay button if there are no card details in the Element

        document.querySelector('button').disabled = event.empty;

        document.querySelector('#card-error').textContent = event.error ? event.error.message : '';
      });

      this.card.addEventListener('change', (event) => {
        if (event.error) {
          this.errorMessage = event.error.message;
        } else {
          this.errorMessage = '';
        }
      });
    }

    if (this.payInfos.paymentMethod === 'iban') {
      let style = {
        base: {
          color: '#32325d',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
          ':-webkit-autofill': {
            color: '#32325d',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
          ':-webkit-autofill': {
            color: '#fa755a',
          },
        },
      };

      const options = {
        clientSecret: `${this.stripeToken}`,
        supportedCountries: ['SEPA'],
        // Fully customizable with appearance API.
        style: style,
        placeholderCountry: 'FR',
      };

      const elements = this.stripe.elements();
      this.bank = elements.create('iban', options);
      this.bank.mount('#iban-element');

      this.bank.on('change', function (event) {
        // Disable the Pay button if there are no card details in the Element

        // document.querySelector('button').disabled = event.empty;

        document.querySelector('#card-error').textContent = event.error ? event.error.message : '';
      });
    }

    // Show a spinner on payment submission

    const loading = function (isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner

        document.querySelector('button').disabled = true;

        document.querySelector('#spinner').classList.remove('hidden');

        document.querySelector('#button-text').classList.add('hidden');
      } else {
        document.querySelector('button').disabled = false;

        document.querySelector('#spinner').classList.add('hidden');

        document.querySelector('#button-text').classList.remove('hidden');
      }
    };
  }

  allShippingAdress() {
    this.shippingAdressService.all(this.token).subscribe(
      (res) => {
        this.shippingAdresses = res.body;
      },
      (err) => {
        console.table(err);
      }
    );
  }

  getShippingAdress(id: string) {
    this.shippingAdressService.get(this.token, id).subscribe(
      (res) => res.body.result,
      (err) => {
        console.table(err);
      }
    );
  }

  deleteShippingAdress(shippingAdress: ShippingAddress) {
    this.shippingAdressService.delete(this.token, shippingAdress.id).subscribe(
      (res) => {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Adress deleted!',
          showConfirmButton: false,
          timer: 2000,
        }),
          (this.shippingAdresses = this.shippingAdresses.filter((t) => t.id !== shippingAdress.id));
      },
      (err) => {
        console.table(err);
      }
    );
  }

  formatPrice(price: any) {
    let prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  resetCart() {
    this.cartService.get(this.token).subscribe((data) => {
      this.idCart = data.body.id;

      const cartItems = data.body.items;

      // Reset Cart
      cartItems.map((elm) => {
        this.cartService.removeItem(this.token, elm.id).subscribe(
          (res) => {
            console.dir(res, 'Item deleted !');
          },
          (err) => {
            console.dir(err);
          }
        );
      });
    });
  }

  addItemsToCart() {
    let promise = Promise.resolve(
      this.cartService.get(this.token).subscribe((data) => {
        this.idCart = data.body.id;

        this.cartData.data.map((element) => {
          const orderItem: Item = {
            product: element.product.id,
            quantity: element.numInCart,
          };

          this.cartService.addItemToCart(orderItem, this.token).subscribe(
            (dataItem) => {
              console.dir(dataItem, 'Item added !');
            },
            (error) => {
              console.dir(error);
            }
          );
        });
      })
    );

    return promise;
  }

  createOrder() {
    this.addItemsToCart()
      .then(() => {
        this.cartService.get(this.token).subscribe((data) => {
          this.idCart = data.body.id;

          const order: OrderDto = {
            cart: this.idCart,
            total_tax: this.totalTax,
          };

          this.orderService.initiate(this.token, order).subscribe(
            (data) => {
              this.orderItem = data.body.order_items;
              if (this.orderItem == undefined) {
                this.router.navigate(['./checkout']);
              }
              this.orderId = data.body.id;
            },
            (err) => {
              console.dir(err);
            }
          );
        });
      })
      .catch((e) => console.dir('Create Order Error', e));
  }

  // updateCart() {

  //   const Items: CartItem = {
  //     product: this.cartData.data,
  //     quantity: this.cartData.total,
  //   }

  //   this.cartService.update(this.token, Items, this.idCart).subscribe();

  // }

  addShippingAdress() {
    this.createOrder();

    const name = this.ShippingAdressForm.get('fullname').value;
    const state = this.ShippingAdressForm.get('state').value;
    const street = this.ShippingAdressForm.get('street').value;
    const city = this.ShippingAdressForm.get('city').value;
    const zipcode = this.ShippingAdressForm.get('zipcode').value;
    const country = this.ShippingAdressForm.get('country').value;
    const phone = this.ShippingAdressForm.get('phone').value;
    const email = this.ShippingAdressForm.get('email').value;

    const shippingAdress: ShippingAddress = {
      name,
      state,
      street1: street,
      city,
      zip_code: zipcode,
      country,
      phone,
      email,
    };

    this.shippingAdressService.create(this.token, shippingAdress).subscribe(
      (res) => {
        this.shippingAdresses.push(res.body);
        console.table(this.cartData);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Adress added sucessfully !',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  choosePaymentMethod(form) {
    const result = form.value.payment_method;

    const temp = result.split(',');
    const resultObject = {};

    for (let i = 0; i < temp.length; i += 2) {
      resultObject[temp[i]] = temp[i + 1];
    }

    this.payInfos = resultObject;

    console.dir(this.payInfos, 'Pay info');
  }

  initPayment() {
    if (this.payInfos.paymentMethod == 'card') {
      this.info = {
        order: this.orderId,
        method: this.payInfos.paymentMethod,
        amount: this.cartTotal,
        currency: 'EUR',
      };

      this.payment.initiateStripePayment(this.token, this.info).subscribe(
        (res) => {
          console.dir(res, 'Init payment success !');
          this.pbKey = res.body.public_key;
          console.dir(this.pbKey, 'Store pbKey success !');
          this.stripeToken = res.body.token;
          this.stripe = Stripe(this.pbKey);
          this.initStripeForm();
          this.initForm(this.cartTotal, this.orderId);
        },
        (err) => console.dir(err, 'Init payment error !')
      );
    } else if (this.payInfos.paymentMethod == 'iban') {
      this.info = {
        order: this.orderId,
        method: 'sepa_debit',
        amount: this.cartTotal,
        currency: 'EUR',
      };

      this.payment.initiateStripePayment(this.token, this.info).subscribe(
        (res) => {
          console.dir(res, 'Init payment success !');
          this.pbKey = res.body.public_key;
          console.dir(this.pbKey, 'Store pbKey success !');
          this.stripeToken = res.body.token;
          this.stripe = Stripe(this.pbKey);
          this.initStripeForm();
          this.initIbanForm();
        },
        (err) => console.dir(err, 'Init payment error !')
      );
    }
  }

  addBankAcc(form) {
    const bic = form.value.bic;
    const iban = form.value.iban;
    const account_name = form.value.account_name;

    const bankAccount: BankAccount = {
      bic,
      iban,
      account_name,
    };

    this.payment.addBankAccount(this.token, bankAccount).subscribe(
      (res) => {
        this.bankAccounts.push(res.body);
        console.table(res);
      },
      (err) => {
        console.table(err);
      }
    );
  }

  getBankAccount() {
    this.payment.getBankAccount(this.token).subscribe(
      (res) => (this.bankAccounts = res.body),
      (err) => console.dir(err)
    );
  }

  deleteBankAcc(id: string) {
    this.payment.deleteBankAccount(id, this.token).subscribe(
      () => (this.bankAccounts = this.bankAccounts.filter((t) => t.id !== id)),
      (err) => console.dir(err, 'Delete bankAcc error')
    );
  }

  addCreditCard(form) {
    const card = new CreditCard();
    card.card_name = form.value.name_on_card;
    card.card_number = form.value.card_number;
    card.cvc = form.value.cvc;
    card.expiration_date = form.value.expireYY + '-' + form.value.expireMM + '-01';

    this.payment.addCreditCard(this.token, card).subscribe(
      (res) => {
        this.creditCards.push(res.body);
        console.table(res);
      },
      (err) => console.table(err)
    );
  }

  getCreditCards() {
    this.payment.getCreditCard(this.token).subscribe(
      (res) => (this.creditCards = res.body),
      (err) => console.dir(err)
    );
  }

  deleteCreditCard(id: string) {
    this.payment.deleteCreditCard(id, this.token).subscribe(
      () => (this.creditCards = this.creditCards.filter((t) => t.id !== id)),
      (err) => console.dir(err, 'Delete credit card erro')
    );
  }

  updateCartItems(event) {
    const result = event.target.value;

    const temp = result.split(',');
    const resultObject = {};

    for (let i = 0; i < temp.length; i += 2) {
      resultObject[temp[i]] = temp[i + 1];
    }

    if (!this.shippingAdressesForActicles.some((el) => el === resultObject)) {
      this.shippingAdressesForActicles.push(resultObject);
      console.dir(this.shippingAdressesForActicles);
    }

    console.dir(this.orderItem);

    this.shippingAdressesForActicles.map((ship) => {
      this.orderItem.map((item) => {
        if (ship.product === item.cart_item.product.id) {
          item.shipping_address = ship.ship_adress;
          console.dir(item.shipping_address, 'Ship adress set!');
          this.orderItemService.update(this.token, item.id, item).subscribe(
            (res) => {
              console.dir(res.body, 'set order items success !');
              this.updateItems(res.body);
            },
            (err) => {
              console.dir(err, 'set order items error !');
            }
          );
        }
      });
    });
  }

  updateItems(item) {
    if (!this.updatedItems.some((el) => el.id === item.id)) {
      this.updatedItems.push(item);
      console.dir(this.updatedItems, 'Item stored !');
    }
  }

  getRates(id) {
    this.shipmentService.getRates(this.token, id).subscribe(
      (res) => {
        this.rates = res.body.results;
        console.dir(res, 'Rates !');
      },
      (err) => console.dir(err, 'Rates error')
    );
  }

  getShipment(id) {
    this.shipmentService.getShipments(this.token, id).subscribe(
      (res) => {
        this.shipments = res.body.result;
        // res.body.forEach(item => this.shipments.push(item));
        console.dir(res, 'Get shipment');
      },
      (err) => console.dir('Get shipment error !', err)
    );
  }

  Exists(object_id, arr: any[]) {
    return arr.some((el) => el.object_id === object_id);
  }

  createShipment() {
    this.orderItem.forEach((orderI) => {
      this.orderItemService.createShipment(this.token, orderI.id).subscribe(
        (res) => {
          console.dir(res, 'create shipment success !');
          // console.dir(this.shipments, 'Shipment stored !');
          this.updatedItems.forEach((i) => {
            i.shipment = res;
          });
          console.dir(this.updatedItems, 'Shipment added !');
          this.getRates(res.id);
          this.getShipment(res.id);
        },
        (err) => {
          Swal.fire({
            // position: 'top-end',
            icon: 'error',
            title: `Shiping Adress invalid`,
            showConfirmButton: false,
            timer: 2000,
          }),
            console.dir(err, 'create shipment error !');
        }
      );
    });
  }

  updateShipmentMethod(event) {
    const shipmentMethod = event.target.value;

    const temp = shipmentMethod.split(',');
    const resultObject = {};

    for (let i = 0; i < temp.length; i += 2) {
      resultObject[temp[i]] = temp[i + 1];
    }

    if (!this.shippingMethodForActicles.some((el) => el === resultObject)) {
      this.shippingMethodForActicles.push(resultObject);
      console.dir(this.shippingMethodForActicles);
    }

    this.updatedItems.forEach((i) => {
      this.shippingMethodForActicles.forEach((m) => {
        if (!this.Exists(m.object_id, this.updatedItems)) {
          i.shipment.rate = m.object_id;
          console.dir(this.updatedItems, 'Shipment method added !');
          this.shipmentService.update(this.token, i.shipment.id, i.shipment).subscribe(
            (res) => console.dir(res, 'Update shipment succes !'),
            (err) => console.dir(err, 'Update shipment error !')
          );
        }
      });
    });
  }

  updateOrderItems() {
    this.updatedItems.map((item) => {
      this.orderItemService.update(this.token, item.id, item).subscribe(
        (res) => {
          console.dir(res.body, 'update order items success !');
        },
        (err) => {
          console.dir(err, 'update order items error !');
        }
      );
    });
  }

  is_placed_order() {
    this.place_order = true;
  }

  _pay() {
    if (this.payInfos.paymentMethod === 'card') {
      this.is_card = true;
      this.is_paypal = false;
      this.is_bank = false;
    }

    if (this.payInfos.paymentMethod === 'paypal') {
      this.is_paypal = true;
      this.is_card = false;
      this.is_bank = false;
      this.getClientToken();
    }

    if (this.payInfos.paymentMethod === 'iban') {
      this.is_bank = true;
      this.is_paypal = false;
      this.is_card = false;
    }
  }

  onSubmit() {
    this.stripe
      .confirmCardPayment(`${this.stripeToken}`, {
        payment_method: {
          card: this.card,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.error) {
          this.errorMessage = result.error.message;
        } else if (result.paymentIntent.status === 'succeeded') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'payment has been made',
            showConfirmButton: false,
            timer: 1500,
          });

          const order = this.orderId;

          this.payment.confirmStripePayment(this.token, result.paymentIntent.id, order).subscribe((res) => {
            this.cartService.deleteCart();
            this.router.navigate(['/orders']);
            console.log(res);
          });
        }
      });
  }

  sepaSubmit() {
    let name = this.ibanForm.get('name').value;
    let email = this.ibanForm.get('email').value;

    this.stripe
      .confirmSepaDebitPayment(`${this.stripeToken}`, {
        payment_method: {
          sepa_debit: this.bank,
          billing_details: {
            name: name,
            email: email,
          },
        },
      })
      .then((result) => {
        console.log(result);
        if (result.error) {
          this.errorMessage = result.error.message;
        } else if (result.paymentIntent.status === 'processing') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment is in progress !',
            showConfirmButton: false,
            timer: 2000,
          });

          const order = this.orderId;

          this.payment.confirmStripePayment(this.token, result.paymentIntent.id, order).subscribe((res) => {
            this.cartService.deleteCart();
            this.router.navigate(['/orders']);
            console.log(res);
          });
        }
      });
  }

  // checkout() {

  // if (this.shippingAdresses == undefined) {
  //   return;
  // }

  // this.cartService.get(this.currentUser.token || this.currentUser['user'].token).subscribe(
  //   (data) => {
  //     this.idCart = data.body.id;

  //     this.cartData.data.forEach((element) => {
  //       const item: Item = {
  //         product: element.product.id,
  //         quantity: element.numInCart,
  //       };
  //       this.cartService.addItemToCart(item, this.currentUser.token).subscribe(
  //         (dataItem) => {},
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     });

  // const addresse: Address = {
  //   country: state,
  //   state: city,
  //   street: address,
  //   zip_code: zip_code,
  // };

  // const shippingMethod: ShippingMethod = {
  //   name: 'DHL',
  //   price: 10000,
  //   currency: 'EUR',
  // };

  // const order = {
  //   cart: this.idCart,
  //   // currency: 'EUR',
  //   total_tax: this.totalTax,
  //   // shipping_tax: this.shippingTax,
  //   // total_prices: this.cartTotal,
  //   // shipping_address: this.ShippingAdress,
  //   // shipping_method: shippingMethod,
  // };

  // this.orderService.initiate(order, this.currentUser.token || this.currentUser['user'].token).subscribe(
  //   (data) => {
  //     console.log('oder created ', data);
  //     // const sommes = +order.total_prices + +order.total_tax + +order.shipping_method.price;
  //     const param = {
  //       order_number: data.body.number,
  //       method: 'card',
  //       // amount: Math.round(sommes),
  //       currency: 'EUR',
  //     };
  //           this.payment.payment(param, this.currentUser.token || this.currentUser['user'].token).subscribe(
  //             (res) => {
  //               this.pbKey = res.body.public_key;
  //               this.token = res.body.token;
  //               this.orderNumber = res.body.payment.order_number;
  //               // const method = res.body.payment.method;
  //               // const amount = res.body.payment.amount;
  //               this.stripe = Stripe(this.pbKey);

  //               this.initStripeForm();

  //               // this.initForm(sommes, this.orderNumber);
  //               console.log(res);
  //             },
  //             (err) => {
  //               console.log(err);
  //             }
  //           );
  //           this.cartService.deleteCart();
  //           Swal.fire({
  //             position: 'top-end',
  //             icon: 'success',
  //             title: `Order has been successfully registrered, check your my to see confirmation`,
  //             showConfirmButton: false,
  //             timer: 5000,
  //           });
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     (errors) => {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'error',
  //         title: `${errors.error.error}`,
  //         showConfirmButton: true,
  //         timer: 5000,
  //       });
  //       console.log(errors);
  //     }
  //   );
  // }

  // OnSubmit() {
  // this.stripe
  //   .confirmCardPayment(`${this.token}`, {
  //     payment_method: {
  //       card: this.card,
  //     },
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     if (result.error) {
  //       this.errorMessage = result.error.message;
  //     } else if (result.paymentIntent.status === 'succeeded') {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'payment has been made',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       const body = {
  //         order_number: this.orderNumber,
  //       };
  //       this.payment
  //         .confirmCardPayment(this.currentUser.token || this.currentUser['user'].token, result.paymentIntent.id, body)
  //         .subscribe((res) => {
  //           this.router.navigate(['/orders']);
  //           console.log(res);
  //         });
  //     }
  //   });
  // }

  // orderPlaced() {
  // //validate before submission
  // var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
  // if (form.checkValidity() === false) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   form.classList.add('was-validated');
  // }
  // else {
  //   alert('Order placed Successfully ! ');
  //   this.getItemsFromCart();
  //   let leftCartItems = this.totalCartItems;
  //   for (let i = leftCartItems - 1; i >= 0; i--) {
  //     this.cartService.removeCart(i);
  //   }
  //   this.router.navigateByUrl('/home');
  // }
  // }

  // getItemsFromCart = () => {
  //   // this.cartService.cartListSubject
  //   //   .subscribe(res => {
  //   //     this.cartList = res;
  //   //     let totalItems = 0;
  //   //     for (let cart of this.cartList) {
  //   //       totalItems += 1;
  //   //     }
  //   //     this.totalCartItems = totalItems;
  //   //   })
  // };

  // shipping() {}

  // ChangeQuantity(id: Number, increaseQuantity: Boolean) {
  //   this.cartService.UpdateCartData(id, increaseQuantity);
  // }

  changeQuantity(e, c, index) {
    const quantity = Number(e.target.value);
    const temp = c.numInCart;
    if (quantity > c.product.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${c.product.quantity} articles of ${c.product.name} left`,
      });
      c.numInCart = c.product.quantity;
    } else if (quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot have 0 article',
      });
      c.numInCart = 1;
    } else {
      c.numInCart = quantity - 1;
      // this.ChangeQuantity(index, true);
    }
    console.dir(quantity, c);
    // }
  }
}
