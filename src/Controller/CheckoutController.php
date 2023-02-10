<?php

namespace App\Controller;

use App\Entity\Order;
use App\Service\StripePaymentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CheckoutController extends AbstractController
{

    #[Route('/checkout', name: 'app_checkout')]
    public function index(Request $request,StripePaymentService $paymentService)
    {

        if(!$this->isCsrfTokenValid('payment',$request->request->get('_token')))
        {
            return $this->redirect('/cart');
        }

        $price=$request->request->get('_price');
        $paymentIntent=$paymentService->paymentIntent($price);


        return $this->render('checkout/index.html.twig',[

            'paymentIntent'=>$paymentIntent
        ]);
    }
    #[Route('/valid-checkout', name: 'app_valid-checkout')]
    public function validOrder(Request $request)
    {

        if(!$this->isCsrfTokenValid('valid-payment',$request->request->get('_token')))
        {
            return $this->redirect('/cart');
        }

        $products=json_decode($request->request->get('_orderProductInformations'));

        if($products)
        {
            dd($products);
            dd($request);

            $user=$this->getUser();
            $price=0;
            $order=new Order();

            $order  ->setUser($user)
                    ->setTotal($price)
                    ->setConfirmedAt(new \DateTimeImmutable())
                    ->setCreatedAt(new \DateTimeImmutable())
                    ->setStatut('VALIDER')
            ;

        }

        return $this->render('checkout/index.html.twig',[

        ]);
    }
}