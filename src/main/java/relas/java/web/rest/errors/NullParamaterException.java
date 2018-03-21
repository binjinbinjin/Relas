package relas.java.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class NullParamaterException extends AbstractThrowableProblem {
    public NullParamaterException(Class o, String paramName) {
        super(ErrorConstants.NULL_PARAMATER, o.getName()+ "null paramater", Status.INTERNAL_SERVER_ERROR, paramName);
    }
}
