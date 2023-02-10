<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderProducts;
use App\Service\StripePaymentService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[isGranted('ROLE_USER')]
class CheckoutController extends AbstractController
{

    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

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

            $user=$this->getUser();
            $price=0;
            $order=new Order();

            for($i=0; $i < count($products) ; $i++ )
            {
                $details=$products[$i];
                $orderProduct=new OrderProducts();

                $orderProduct   ->setProduct($details->id)
                                ->setQuantity($details->qte)
                                ->setTotal($details->price * $details->qte)
                ;
                $price += $details->price * $details->qte;
                $this->entityManager->persist($orderProduct);

                $order->addOrderProduct($orderProduct);
            }

            $order
                    ->setUser($user)
                    ->setTotal($price)
                    ->setCreatedAt(new \DateTime())
                    ->setStatut('en cours')
            ;

            $this->entityManager->persist($order);
            $this->entityManager->flush();

            return $this->redirect('/');
//            return $this->redirectToRoute('app_home', [], Response::HTTP_SEE_OTHER);

        }

    }
}