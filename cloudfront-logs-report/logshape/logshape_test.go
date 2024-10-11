package logshape_test

import (
	"testing"

	"github.com/angelochecked/cloudfront-logs-report/v2/logshape"
	"github.com/go-test/deep"
)

func TestLogFormatter(t *testing.T) {
	log := `#Version: 1.0
#Fields: date time x-edge-location sc-bytes c-ip cs-method cs(Host) cs-uri-stem sc-status cs(Referer) cs(User-Agent) cs-uri-query cs(Cookie) x-edge-result-type x-edge-request-id x-host-header cs-protocol cs-bytes time-taken x-forwarded-for ssl-protocol ssl-cipher x-edge-response-result-type cs-protocol-version fle-status fle-encrypted-fields c-port time-to-first-byte x-edge-detailed-result-type sc-content-type sc-content-len sc-range-start sc-range-end
2024-10-11	22:33:27	SIN2-P8	808	114.119.135.98	GET	dssqkj1981x2t.cloudfront.net	/graph/link/are-developers-needed-in-the-age-of-ai-link	302	https://angeloceccato.it/graph	Mozilla/5.0%20(Linux;%20Android%207.0;)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Mobile%20Safari/537.36%20(compatible;%20PetalBot;+https://webmaster.petalsearch.com/site/petalbot)	-	-	Miss	5fnl73FSgF4xlEgwShL_S0rJqoX2DYNzHSqDJV7QxiIGAH4rUj5zQQ==	angeloceccato.it	https	470	0.382	-	TLSv1.3	TLS_AES_128_GCM_SHA256	Miss	HTTP/1.1	-	-	25751	0.382	Miss	text/html;%20charset=utf-8	313	-	-
2024-10-11	22:33:28	SIN2-P8	17006	114.119.135.98	GET	dssqkj1981x2t.cloudfront.net	/graph/link/are-developers-needed-in-the-age-of-ai-link/	200https://angeloceccato.it/graph	Mozilla/5.0%20(Linux;%20Android%207.0;)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Mobile%20Safari/537.36%20(compatible;%20PetalBot;+https://webmaster.petalsearch.com/site/petalbot)	-	-	Miss	CR9FYMIxLVOQfCyrpmMfeiqdbqDprhsaRejfIe8i_6sNwGw63c0plQ==	angeloceccato.it	https	471	0.663	-	TLSv1.3	TLS_AES_128_GCM_SHA256	Miss	HTTP/1.1	-	-	25753	0.495	Miss	text/html	16557	-	-
2024-10-11	22:35:07	LAX54-P2	25104	107.151.187.202	GET	dssqkj1981x2t.cloudfront.net	/	200	-	Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/66.0.3359.117%20Safari/537.36	-	-	Hit	__F65GZu9Q1OXhCIUubwspRCGF-g7MiYWCBpf1LjgPAHaMOgoqLPOQ==	angeloceccato.com	https	204	0.001	-	TLSv1.2	ECDHE-RSA-AES128-GCM-SHA256	Hit	HTTP/1.1	-	-	41313	0.001	Hit	text/html	24650	-	-
2024-10-11	22:35:07	LAX54-P2	25111	128.14.159.250	GET	dssqkj1981x2t.cloudfront.net	/	200	-	Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/66.0.3359.117%20Safari/537.36	-	-	RefreshHit	ZAgI43BC6T0g9p6QamLq8om9KF9V_HTTLRqF5DsLe4VY5i6S1vZhqw==	angeloceccato.com	https	204	0.298	-	TLSv1.2	ECDHE-RSA-AES128-GCM-SHA256	RefreshHit	HTTP/1.1	-	-	42201	0.298	RefreshHit	text/html	24650	-	-
2024-10-11	22:35:07	LAX54-P2	25104	128.14.159.252	GET	dssqkj1981x2t.cloudfront.net	/	200	-	Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/66.0.3359.117%20Safari/537.36	-	-	Hit	c3LgehzP2rmNi4CCsycRIkkwPDoQ5Sax5H64I33_O9NUQGsP__49iQ==	angeloceccato.com	https	204	0.000	-	TLSv1.2	ECDHE-RSA-AES128-GCM-SHA256	Hit	HTTP/1.1	-	-	54251	0.000	Hit	text/html	24650	-	-
2024-10-11	22:35:07	LAX54-P2	25104	128.14.159.251	GET	dssqkj1981x2t.cloudfront.net	/	200	-	Mozilla/5.0%20(Windows%20NT%2010.0;%20WOW64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/66.0.3359.117%20Safari/537.36	-	-	Hit	jC7GX1G6KTVpaXtpxxQho3nJ57wqmsiiXxtw_RWrlOryK5RqHtsBvQ==	angeloceccato.com	https	204	0.001	-	TLSv1.2	ECDHE-RSA-AES128-GCM-SHA256	Hit	HTTP/1.1	-	-	45931	0.001	Hit	text/html	24650	-	-
2024-10-11	22:35:45	SEA900-P3	529	216.244.66.244	GET	dssqkj1981x2t.cloudfront.net	/robots.txt	200	-	Mozilla/5.0%20(compatible;%20DotBot/1.2;%20+https://opensiteexplorer.org/dotbot;%20help@moz.com)	-	-	RefreshHit	Szyb5Cz7_JK0rENfdp8-jc7oJmoTbjNJZoJ_iKjI7F6Oj0xq9SCeog==	angeloceccato.com	https	222	0.273	-	TLSv1.2	ECDHE-RSA-AES128-GCM-SHA256	RefreshHit	HTTP/1.1	-	-	37933	0.273	RefreshHit	text/plain	69	-	-
2024-10-11	22:35:44	SEA900-P3	578	216.244.66.244	GET	dssqkj1981x2t.cloudfront.net	/robots.txt	301	-	Mozilla/5.0%20(compatible;%20DotBot/1.2;%20+https://opensiteexplorer.org/dotbot;%20help@moz.com)	-	-	Redirect	iG3alVWAwv4dYiX9xuaMLXFWOq3GGU2usKwUPRS3T8CNJkkXW9i_rA==	angeloceccato.com	http	222	0.001	-	-	-	Redirect	HTTP/1.1	-	-	49918	0.001	Redirect	text/html	167	-	-
`
	formatted := logshape.LogFormatter(log)

	expectedFields := []string{
		"date",
		"time",
		"x-edge-location",
		"sc-bytes",
		"c-ip",
		"cs-method",
		"cs(Host)",
		"cs-uri-stem",
		"sc-status",
		"cs(Referer)",
		"cs(User-Agent)",
		"cs-uri-query",
		"cs(Cookie)",
		"x-edge-result-type",
		"x-edge-request-id",
		"x-host-header",
		"cs-protocol",
		"cs-bytes",
		"time-taken",
		"x-forwarded-for",
		"ssl-protocol",
		"ssl-cipher",
		"x-edge-response-result-type",
		"cs-protocol-version",
		"fle-status",
		"fle-encrypted-fields",
		"c-port",
		"time-to-first-byte",
		"x-edge-detailed-result-type",
		"sc-content-type",
		"sc-content-len",
		"sc-range-start",
		"sc-range-end",
	}

	if diff := deep.Equal(expectedFields, formatted.Fields); diff != nil {
		//	t.Errorf("got %v, \n ##### \n want %v", formatted.Fields, expectedFields)
		t.Error(diff)
	}
}
