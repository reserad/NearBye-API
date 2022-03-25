import axios from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FirebaseService {
    private readonly logger = new Logger(FirebaseService.name);
    
    getShortenedURL = async (link: string): Promise<string> => {
        try {
            let response = await axios({
                method: 'post',
                url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_WEB_API_KEY}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    dynamicLinkInfo: {
                        domainUriPrefix: process.env.FIREBASE_DYNAMIC_LINK_DOMAIN,
                        link
                    },
                    suffix: {
                        option: 'UNGUESSABLE'
                    }
                }
            });

            if (!response || !response.data || !response.data.shortLink) {
                this.logger.error(response);
                throw new HttpException('Could not create shortlink.', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return response.data.shortLink;
        } catch (err) {
            this.logger.error(err);
            throw new HttpException('Could not create shortlink.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}