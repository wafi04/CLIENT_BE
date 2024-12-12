import { Body, Controller, Post } from "@nestjs/common";
import { PaymentDto } from "./payment.dto";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async Create(@Body() data: PaymentDto) {
    return await this.paymentService.create(data);
  }
}
