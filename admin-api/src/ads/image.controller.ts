import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('')
export class ImageController {
    @Get(':imagepath')
    sendFile(@Param('imagepath') image, @Res() res){
        return res.sendFile(image, {root: 'uploads'})
    }
}
